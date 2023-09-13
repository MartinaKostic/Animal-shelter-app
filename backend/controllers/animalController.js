import prisma from "../prisma/prismaDbClient.js";

const getAnimals = async (request, response) => {
  try {
    // Use Prisma's findMany to retrieve all animals from the animals table
    const animals = await prisma.Animals.findMany({
      include: {
        species: {
          select: {
            animal_type: true,
          },
        },
      },
    });
    console.log(request);
    // Send the retrieved animals as a JSON response
    response.status(200).json(animals);
  } catch (error) {
    console.error("Error retrieving animals:", error);
    response.status(500).json({ error: "Server error" });
  }
};

const updateAdoptionStatus = async (req, res) => {
  const { id } = req.params;
  const { adopted } = req.body;

  try {
    await prisma.Animals.update({
      where: { id: parseInt(id) },
      data: { adopted: adopted },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating adopted status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const { name, years, species_id, adopted, checkup, chip, description } =
    req.body;
  console.log(req.body);
  try {
    const existingSpecies = await prisma.Species.findUnique({
      where: { animal_type: species },
    });

    await prisma.Animals.update({
      where: { id: parseInt(id) },
      data: {
        name,
        species: existingSpecies,
        picture,
        years,
        adopted,
        checkup,
        chip,
        description,
      },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating animal information:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export default {
  getAnimals,
  updateAdoptionStatus,
  updateAnimal,
  // Other controller functions
};
