import Character from '../models/Character.model.js';
// metodo para guardar los personajes favoritos en la base de datos
// Obtener todos los personajes
export const getCharacters = async (req, res) => {   
  try {
    const characters = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los personajes', error });
  }
};

// Obtener un personaje por ID
export const getCharacterById = async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ message: 'Personaje no encontrado' });
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el personaje', error });
  }
};

// Agregar un personaje capturado
export const addCharacter = async (req, res) => {
  try {
    const { name, description, image, location } = req.body;

    const character = await Character.create({
      name,
      description,
      image,
      location,
      capturedBy: req.user.id,
      obtainedThrough: 'capture',
    });

    res.status(201).json(character);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el personaje', error });
  }
};
