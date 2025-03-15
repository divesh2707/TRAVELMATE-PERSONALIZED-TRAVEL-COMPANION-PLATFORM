import { createPackage,getPackagesByCityId, getCityIdByPackageid } from "../models/packageModel.js";
import {  getHotelsByCityAndCategory } from '../models/hotelModel.js';
import { getCityById } from '../models/cityModel.js';
import { getFamousPlacesByCityId } from '../models/placeModel.js';


export const addPackage = async (req, res) => {
    const { city_id, no_of_days, package_description, package_cost } = req.body;

    try {
        const packageId = await createPackage(city_id, no_of_days, package_description, package_cost);
        res.status(201).json({ message: 'Package added successfully', packageId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add package' });
    }
};

export const fetchPackagesByCityId = async (req, res) => {
    const { city_id } = req.params;

    try {
        const packages = await getPackagesByCityId(city_id);
        res.status(200).json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};



export const fetchDetailedPackage = async (req, res) => {
    const { city_id } = req.params;

    try {
        // Fetch city details
        const cityDetails = await getCityById(city_id);
        if (!cityDetails) {
            return res.status(404).json({ error: 'City not found' });
        }

        // Fetch package details
        const packageDetails = await getPackagesByCityId(city_id);
        if (!packageDetails) {
            return res.status(404).json({ error: 'Package not found for the given city' });
        }

        // Fetch famous places
        const famousPlaces = await getFamousPlacesByCityId(city_id);

        // Fetch luxury hotels
        const luxuryHotels = await getHotelsByCityAndCategory(city_id,'Luxury');

        // Combine details into a single response
        const packageSummary = {
            city: cityDetails,
            package: packageDetails,
            famousPlaces,
            luxuryHotels,
        };

        res.status(200).json(packageSummary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch package details' });
    }
};

import { updatePackage } from '../models/packageModel.js';

export const updatePackageController = async (req, res) => {
    const { package_id } = req.params;
    const { city_id, no_of_days, package_description, package_cost } = req.body;

    try {
        // Ensure all required fields are present or valid
        if (!package_id) {
            return res.status(400).json({ error: 'Package ID is required' });
        }

        // Update package in the database
        const updatedPackageId = await updatePackage(package_id, city_id, no_of_days, package_description, package_cost);
        
        // Send response with updated package ID
        return res.status(200).json({ message: `Package updated successfully with ID: ${updatedPackageId}` });
    } catch (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({ error: 'Failed to update package' });
    }
};

export const fetchCityIdByPackageId = async (req, res) => {
    try {
        const { package_id } = req.params; // Extract package_id properly
        const id = parseInt(package_id); // Correct parseInt syntax

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid package_id" });
        }

        const cityData = await getCityIdByPackageid(id); // Rename response variable
        return res.status(200).json(cityData);
    } catch (err) {
        console.error("Error fetching city_id", err);
        return res.status(500).json({ error: "Error fetching city_id" });
    }
};
