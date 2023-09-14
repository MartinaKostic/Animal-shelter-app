import prisma from "../prisma/prismaDbClient.js";

const getDonations = async (request, response) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const donations = await prisma.Donations.findMany();
    console.log(request);
    // Send the retrieved donations as a JSON response
    response.status(200).json(donations);
  } catch (error) {
    console.error("Error retrieving donations:", error);
    response.status(500).json({ error: "Server error" });
  }
};

const updateDonatedCategory = async (req, res) => {
  const { id } = req.params;
  const category = req.body.category;
  console.log("ahahahahhahahaahh", req.params.id);
  try {
    await prisma.Donations.update({
      where: { id: parseInt(id) },
      data: {
        category,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating donation category status:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const createDonation = async (req, res) => {
  const { type, value, description, category } = req.body;

  try {
    const newDonation = await prisma.Donations.create({
      data: {
        type,
        value,
        description,
        category,
      },
    });

    res.status(201).json(newDonation);
  } catch (error) {
    console.error("Error creating donation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    // Use Prisma's delete method to delete the donation by ID
    await prisma.Donations.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).end(); // Respond with a 204 No Content status upon successful deletion
  } catch (error) {
    console.error("Error deleting donation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  getDonations,
  updateDonatedCategory,
  createDonation,
  deleteDonation,
};
