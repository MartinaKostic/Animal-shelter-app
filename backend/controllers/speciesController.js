import prisma from "../prisma/prismaDbClient.js";

const getSpecies = async (request, response) => {
  const { animal_type } = request.query.animal_type;
  //npr rabbit

  try {
    const species = await prisma.Species.findMany({
      where: {
        animal_type: animal_type,
      },
    });
    response.json(species);
  } catch (error) {
    console.error("Error retrieving Species by animal_type:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  getSpecies,
};
