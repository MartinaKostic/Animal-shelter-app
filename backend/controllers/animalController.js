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
  const { name, years, species, adopted, checkup, chip, description, picture } =
    req.body;
  console.log("alo", req.body.years);
  try {
    const existingSpecies = await prisma.Species.findUnique({
      where: { animal_type: species },
    });
    console.log(existingSpecies);
    if (!existingSpecies) {
      // species does not exist
      res.status(404).json({ error: "Species not found" });
      return;
    }
    console.log(req.body.species);
    // Update the Animals record with the found Species reference
    await prisma.Animals.update({
      where: { id: parseInt(id) },
      data: {
        name,
        picture,
        years: +years,
        species_id: existingSpecies.id,
        adopted,
        checkup: new Date(checkup),
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

const createAnimal = async (req, res) => {
  const {
    name,
    species_id,
    chip,
    description,
    years,
    picture,
    checkup,
    adopted,
  } = req.body;

  try {
    const newAnimal = await prisma.Animals.create({
      data: {
        name,
        species_id,
        chip,
        description,
        years,
        picture,
        checkup: new Date(checkup),
        adopted,
      },
    });

    res.status(201).json(newAnimal);
  } catch (error) {
    console.error("Error creating animal:", error);
    res.status(500).json({ error: "Server error" });
  }
};
export default {
  getAnimals,
  updateAdoptionStatus,
  updateAnimal,
  createAnimal,
};
