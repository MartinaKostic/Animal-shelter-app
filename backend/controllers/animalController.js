import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAnimals = async (req, res) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const animals = await prisma.animal.findMany();

    // Send the retrieved animals as a JSON response
    res.status(200).json(animals);
  } catch (error) {
    console.error("Error retrieving animals:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    // Disconnect from the Prisma Client
    await prisma.$disconnect();
  }
};

module.exports = {
  getAnimals,
  // Other controller functions
};
