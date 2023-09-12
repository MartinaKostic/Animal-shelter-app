import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAnimals = async (response) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const animals = await prisma.Animals.findMany();

    // Send the retrieved animals as a JSON response
    response.status(200).json(animals);
  } catch (error) {
    console.error("Error retrieving animals:", error);
    response.status(500).json({ error: "Server error" });
  } finally {
    // Disconnect from the Prisma Client
    await prisma.$disconnect();
  }
};

export default {
  getAnimals,
  // Other controller functions
};
