import prisma from "../prisma/prismaDbClient.js";

const getDonations = async (request, response) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const donations = await prisma.Donations.findMany({
      include: {
        donation_category: {
          select: {
            name: true,
          },
        },
      },
    });
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
  const category = req.body;

  try {
    await prisma.Donations.update({
      where: { id: parseInt(id) },
      data: {
        category_id: { connect: { id: category.donation_category } },
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating donation category status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  getDonations,
  updateDonatedCategory,
};
