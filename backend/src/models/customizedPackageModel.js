import pool from "../config/db.js";

// ✅ Create a customized package
export const createCustomizedPackage = async (user_id, package_id, city_id, hotel_id) => {
    const query = `
        INSERT INTO customized_packages (user_id, package_id, city_id, hotel_id)
        VALUES ($1, $2, $3, $4) RETURNING id;
    `;
    const { rows } = await pool.query(query, [user_id, package_id, city_id, hotel_id]);
    return rows[0].id;
};

// ✅ Check if a customized package already exists for a user & city
export const findExistingCustomPackage = async (user_id, city_id) => {
    const query = `SELECT id FROM customized_packages WHERE user_id = $1 AND city_id = $2 AND is_booked = FALSE;`;
    const { rows } = await pool.query(query, [user_id, city_id]);
    return rows.length > 0 ? rows[0].id : null;
};

// ✅ Update hotel in an existing customized package
export const updateCustomPackageHotel = async (custom_package_id, hotel_id) => {
    const query = `UPDATE customized_packages SET hotel_id = $1 WHERE id = $2;`;
    await pool.query(query, [hotel_id, custom_package_id]);
};

// ✅ Delete old place orders before inserting a new visit order
export const deleteExistingPlaceOrders = async (custom_package_id) => {
    const query = `DELETE FROM customized_places_order WHERE custom_package_id = $1;`;
    await pool.query(query, [custom_package_id]);
};

// ✅ Save custom places order (optimized batch insert)
export const saveCustomPlacesOrder = async (custom_package_id, placesOrder) => {
    const values = placesOrder.map((place, index) => `(${custom_package_id}, ${place.place_id}, ${index + 1})`).join(", ");
    const query = `INSERT INTO customized_places_order (custom_package_id, place_id, visit_order) VALUES ${values};`;
    await pool.query(query);
};

// ✅ Fetch a customized package with all details
export const fetchCustomizedPackage = async (user_id, city_id) => {
    const query = `
        SELECT 
            cp.id AS custom_package_id, 
            cp.package_id,  
            p.no_of_days,   
            c.city_name, 
            c.state,
            c.country,
            c.image AS city_image, 
            h.hotel_name, 
            h.hotel_category, 
            h.hotel_description,
            h.id AS hotel_id,
            h.price_per_night,
            h.city_id as hotel_city_id,
            h.image_1 as hotel_image_1,
            h.image_2 as hotel_image_2,
            h.image_3 as hotel_image_3,
            f.id AS place_id,
            f.place_name, 
            f.place_description AS place_description,
            f.image AS place_image, 
            cpo.visit_order
        FROM customized_packages cp
        JOIN packages p ON cp.package_id = p.id
        JOIN cities c ON cp.city_id = c.id
        JOIN hotels h ON cp.hotel_id = h.id
        JOIN customized_places_order cpo ON cpo.custom_package_id = cp.id
        JOIN famous_places f ON cpo.place_id = f.id
        WHERE cp.user_id = $1 AND cp.city_id = $2
        ORDER BY cpo.visit_order;
    `;

    const { rows } = await pool.query(query, [user_id, city_id]);
    return rows;
};


export const markPackageAsBooked = async (custom_package_id) => {
    const query = `UPDATE customized_packages SET is_booked = TRUE WHERE id = $1;`;
    await pool.query(query, [custom_package_id]);
};


export const fetchLatestUnbookedCustomizedPackage = async (user_id, city_id) => {
    const query = `
        SELECT 
            cp.id AS custom_package_id, 
            cp.package_id,  
            p.no_of_days,   
            c.city_name, 
            c.state,
            c.country,
            c.image AS city_image, 
            h.hotel_name, 
            h.hotel_category, 
            h.hotel_description,
            h.id AS hotel_id,
            h.price_per_night,
            h.city_id as hotel_city_id,
            h.image_1 as hotel_image_1,
            h.image_2 as hotel_image_2,
            h.image_3 as hotel_image_3,
            f.id AS place_id,
            f.place_name, 
            f.place_description AS place_description,
            f.image AS place_image, 
            cpo.visit_order
        FROM customized_packages cp
        JOIN packages p ON cp.package_id = p.id
        JOIN cities c ON cp.city_id = c.id
        JOIN hotels h ON cp.hotel_id = h.id
        JOIN customized_places_order cpo ON cpo.custom_package_id = cp.id
        JOIN famous_places f ON cpo.place_id = f.id
        WHERE cp.user_id = $1 
        AND cp.city_id = $2 
        AND cp.is_booked = FALSE
        ORDER BY cp.id DESC, cpo.visit_order;
    `;

    const { rows } = await pool.query(query, [user_id, city_id]);
    return rows;
};


export const fetchBookedCustomPackageById = async (custom_package_id) => {
    const query = `
        SELECT 
            cp.id AS custom_package_id, 
            cp.package_id,  
            p.no_of_days,   
            c.city_name, 
            c.state,
            c.country,
            c.image AS city_image, 
            h.hotel_name, 
            h.hotel_category, 
            h.hotel_description,
            h.id AS hotel_id,
            h.price_per_night,
            h.city_id as hotel_city_id,
            h.image_1 as hotel_image_1,
            h.image_2 as hotel_image_2,
            h.image_3 as hotel_image_3,
            f.id AS place_id,
            f.place_name, 
            f.place_description AS place_description,
            f.image AS place_image, 
            cpo.visit_order
        FROM customized_packages cp
        JOIN packages p ON cp.package_id = p.id
        JOIN cities c ON cp.city_id = c.id
        JOIN hotels h ON cp.hotel_id = h.id
        JOIN customized_places_order cpo ON cpo.custom_package_id = cp.id
        JOIN famous_places f ON cpo.place_id = f.id
        WHERE cp.id = $1;  -- ✅ Fetch package by ID only
    `;

    const { rows } = await pool.query(query, [custom_package_id]);
    return rows;
};
