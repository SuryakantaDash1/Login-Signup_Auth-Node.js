import HomeBanner from '../model/homeBanner.model.js';
import ExclusiveGallery from '../model/exclusiveGallery.model.js';
import ExclusiveServices from '../model/exclusiveServices.model.js';
import ProofOfWork from '../model/proofOfWork.model.js';







// Controller function to handle creating a new home banner


export async function createHomeBanner(req, res) {
    try {
        // Extract necessary data from request body
        const { uniqueId, imageUrl } = req.body;

        // Create a new home banner record
        const newHomeBanner = new HomeBanner({
            uniqueId,
            imageUrl,
            // Add other properties as needed
        });

        // Save the new home banner record to the database
        await newHomeBanner.save();

        return res.status(201).json({ msg: "Home banner created successfully" });
    } catch (error) {
        console.error("Error creating home banner:", error);
        return res.status(500).json({ error: "An error occurred while creating home banner" });
    }
}

// Controller function to handle fetching home banners
export async function getHomeBanner(req, res) {
    try {
        // Fetch all home banners from the database
        const homeBanners = await HomeBanner.find();

        // Check if home banners exist
        if (!homeBanners || homeBanners.length === 0) {
            return res.status(404).json({ error: "No home banners found" });
        }

        return res.status(200).json(homeBanners);
    } catch (error) {
        console.error("Error fetching home banners:", error);
        return res.status(500).json({ error: "An error occurred while fetching home banners" });
    }
}



// Controller function to handle creating exclusive gallery items
export async function createExclusiveGallery(req, res) {
    try {
        const { uniqueId, imageUrl } = req.body;

        const newExclusiveGallery = new ExclusiveGallery({
            uniqueId,
            imageUrl,
        });

        await newExclusiveGallery.save();

        return res.status(201).json({ msg: "Exclusive gallery item created successfully" });
    } catch (error) {
        console.error("Error creating exclusive gallery item:", error);
        return res.status(500).json({ error: "An error occurred while creating exclusive gallery item" });
    }
}

// Controller function to handle fetching exclusive gallery items
export async function getExclusiveGallery(req, res) {
    try {
        const { uniqueId } = req.params;

        if (!uniqueId) {
            return res.status(400).json({ error: "Unique ID is required" });
        }

        const exclusiveGalleryItems = await ExclusiveGallery.find({ uniqueId });

        if (exclusiveGalleryItems.length === 0) {
            return res.status(404).json({ error: "Exclusive gallery not found" });
        }

        return res.status(200).json(exclusiveGalleryItems);
    } catch (error) {
        console.error("Error fetching exclusive gallery:", error);
        return res.status(500).json({ error: "An error occurred while fetching exclusive gallery" });
    }
}

// Controller function to handle creating exclusive services
export async function createExclusiveService(req, res) {
    try {
        const { uniqueId, servicesName, imageUrl } = req.body;

        const newExclusiveService = new ExclusiveServices({
            uniqueId,
            servicesName,
            imageUrl,
        });

        await newExclusiveService.save();

        return res.status(201).json({ msg: "Exclusive service created successfully" });
    } catch (error) {
        console.error("Error creating exclusive service:", error);
        return res.status(500).json({ error: "An error occurred while creating exclusive service" });
    }
}

// Controller function to handle fetching exclusive services
export async function getExclusiveServices(req, res) {
    try {
        const { uniqueId } = req.params;

        if (!uniqueId) {
            return res.status(400).json({ error: "Unique ID is required" });
        }

        const exclusiveServices = await ExclusiveServices.find({ uniqueId });

        if (!exclusiveServices) {
            return res.status(404).json({ error: "Exclusive services not found" });
        }

        return res.status(200).json(exclusiveServices);
    } catch (error) {
        console.error("Error fetching exclusive services:", error);
        return res.status(500).json({ error: "An error occurred while fetching exclusive services" });
    }
}

// Controller function to handle creating proof of work items
export async function createProofOfWork(req, res) {
    try {
        const { uniqueId, workName, imageUrl } = req.body;

        const newProofOfWork = new ProofOfWork({
            uniqueId,
            workName,
            imageUrl,
        });

        await newProofOfWork.save();

        return res.status(201).json({ msg: "Proof of work created successfully" });
    } catch (error) {
        console.error("Error creating proof of work:", error);
        return res.status(500).json({ error: "An error occurred while creating proof of work" });
    }
}

// Controller function to handle fetching proof of work items
export async function getProofOfWork(req, res) {
    try {
        const { uniqueId } = req.params;

        if (!uniqueId) {
            return res.status(400).json({ error: "Unique ID is required" });
        }

        const proofOfWork = await ProofOfWork.find({ uniqueId });

        if (!proofOfWork) {
            return res.status(404).json({ error: "Proof of work not found" });
        }

        return res.status(200).json(proofOfWork);
    } catch (error) {
        console.error("Error fetching proof of work:", error);
        return res.status(500).json({ error: "An error occurred while fetching proof of work" });
    }
}
