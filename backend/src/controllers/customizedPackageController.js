import {
    createCustomizedPackage,
    findExistingCustomPackage,
    updateCustomPackageHotel,
    deleteExistingPlaceOrders,
    saveCustomPlacesOrder,
    fetchCustomizedPackage as fetchCustomPackageModel,
    fetchLatestUnbookedCustomizedPackage,fetchBookedCustomPackageById
} from "../models/customizedPackageModel.js";


// export const fetchCustomizedPackage = async (req, res) => {
//     const { user_id, city_id } = req.params;

//     try {
//         const packageData = await fetchCustomPackageModel(user_id, city_id);

//         if (packageData.length === 0) {
//             return res.status(404).json({ error: "No customized package found" });
//         }

//         // Organize places properly
//         const customizedPackage = {
//             custom_package_id: packageData[0].custom_package_id,
//             package_id: packageData[0].package_id,
//             no_of_days: packageData[0].no_of_days,
//             city: {
//                 city_name: packageData[0].city_name,
//                 image: packageData[0].city_image,
//                 state: packageData[0].state,
//                 country: packageData[0].country,
//             },
//             hotel: {
//                 hotel_name: packageData[0].hotel_name,
//                 hotel_category: packageData[0].hotel_category,
//                 hotel_description: packageData[0].hotel_description,
//                 price_per_night: packageData[0].price_per_night,
//                 image_1: packageData[0].hotel_image_1,
//                 image_2: packageData[0].hotel_image_2,
//                 image_3: packageData[0].hotel_image_3,
//                 city_id: packageData[0].hotel_city_id,
//                 id: packageData[0].hotel_id,
//             },
//             famousPlaces: packageData.map(row => ({
//                 id: row.place_id,
//                 place_name: row.place_name,
//                 place_description: row.place_description,
//                 image: row.place_image,
//                 visit_order: row.visit_order
//             }))
//         };
//         console.log(customizedPackage)
//         res.status(200).json(customizedPackage);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch customized package" });
//     }
// };

// ✅ Save or update a customized package
export const saveCustomizedPackage = async (req, res) => {
    const { user_id, city_id } = req.params;
    const { package_id, hotel_id, famousPlaces } = req.body;

    if (!package_id || !hotel_id || !famousPlaces || famousPlaces.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Find an existing unbooked package
        let customPackageId = await findExistingCustomPackage(user_id, city_id);

        if (customPackageId) {
            // Update existing package
            await updateCustomPackageHotel(customPackageId, hotel_id);
            await deleteExistingPlaceOrders(customPackageId);
        } else {
            // Create a new customized package
            customPackageId = await createCustomizedPackage(user_id, package_id, city_id, hotel_id);
        }

        // Save new visit order
        await saveCustomPlacesOrder(customPackageId, famousPlaces);

        res.status(200).json({ message: "Customized package saved successfully", customPackageId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save customized package" });
    }
};


export const fetchCustomizedPackage = async (req, res) => {
    const { user_id, city_id, custom_package_id } = req.params;

    try {
        let packageData;

        if (custom_package_id) {
            // ✅ Fetch booked package by ID
            packageData = await fetchBookedCustomPackageById(custom_package_id);
        } else {
            // ✅ Fetch the latest unbooked customized package
            packageData = await fetchLatestUnbookedCustomizedPackage(user_id, city_id);
        }

        if (packageData.length === 0) {
            return res.status(404).json({ error: "No customized package found" });
        }

        // Organize places properly
        const customizedPackage = {
            custom_package_id: packageData[0].custom_package_id,
            package_id: packageData[0].package_id,
            no_of_days: packageData[0].no_of_days,
            city: {
                city_name: packageData[0].city_name,
                image: packageData[0].city_image,
                state: packageData[0].state,
                country: packageData[0].country,
            },
            hotel: {
                hotel_name: packageData[0].hotel_name,
                hotel_category: packageData[0].hotel_category,
                hotel_description: packageData[0].hotel_description,
                price_per_night: packageData[0].price_per_night,
                image_1: packageData[0].hotel_image_1,
                image_2: packageData[0].hotel_image_2,
                image_3: packageData[0].hotel_image_3,
                city_id: packageData[0].hotel_city_id,
                id: packageData[0].hotel_id,
            },
            famousPlaces: packageData.map(row => ({
                id: row.place_id,
                place_name: row.place_name,
                place_description: row.place_description,
                image: row.place_image,
                visit_order: row.visit_order
            }))
        };

        res.status(200).json(customizedPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch customized package" });
    }
};
