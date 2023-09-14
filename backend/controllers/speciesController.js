import prisma from "../prisma/prismaDbClient.js";

const getSpecies = async (request, response) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const donations = await prisma.Species.findMany();
    console.log(request);
    // Send the retrieved donations as a JSON response
    response.status(200).json(donations);
  } catch (error) {
    console.error("Error retrieving donations:", error);
    response.status(500).json({ error: "Server error" });
  }
};
export default {
  getSpecies,
};
