import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { updateAPet, getOnePet } from "../../store/pets";
import "./UpdatePet.css";

const UpdatePet = () => {
  const dispatch = useDispatch();
  const pet = useSelector((state) => state.pet);
//   console.log("********", pet);
  const { id } = useParams();
  console.log("********", id);
//   const history = useHistory();

  const [petName, setPetName] = useState(pet?.petName);
  const [age, setAge] = useState(pet?.age);
  const [sex, setSex] = useState(pet?.sex);
  const [petType, setPetType] = useState(pet?.petType);
  const [otherPets, setOtherPets] = useState(pet?.otherPets);
  const [temperament, setTemperament] = useState(pet?.temperament);
  const [specialCare, setSpecialCare] = useState(pet?.specialCare);
  const [tricks, setTricks] = useState(pet?.tricks);
  const [adoptable, setAdoptable] = useState(pet?.adoptable);
  const [single, setSingle] = useState(pet?.single);
  const [inputValue, setInputValue] = useState("");
  const [formOpen, setFormOpen] = useState(false);

//   useEffect(() => {
//     setPetName(petName)
//     console.log('useEffectPet', pet)
//     console.log(pet)
//   }, []);

  useEffect(() => {
    dispatch(getOnePet(id));
  }, [dispatch, id]);

  const updatePetEvent = async (e) => {
      e.preventDefault();

    const pet = {
        id,
        petName,
        age,
        sex,
        petType,
        otherPets,
        temperament,
        specialCare,
        tricks,
        adoptable,
        single
    };

    const updatedPet = await dispatch(updateAPet(pet));
    // console.log('updatedPet component event', updatedPet)
    setFormOpen(!formOpen);
  };



  return (
    <div className="update-pet-form-div">
      <button id="updateBtn" onClick={() => setFormOpen(!formOpen)} >
        Update Your Buddy
      </button>
        <div>
            {formOpen &&
                <>
                <form className="updateAPetForm" onSubmit={updatePetEvent}>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Pet Name
                        <input
                        type="text"
                        name="petName"
                        className="createPetForm-input"
                        value={pet.petName}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Pet Age
                        <select
                        id="createPetForm-age-select"
                        onChange={(e) => setAge(e.target.value)}
                        required
                        >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={0}>Unsure</option>
                        <option value={1}>1 - 4</option>
                        <option value={2}>5 - 9</option>
                        <option value={3}>10 - 14</option>
                        <option value={4}>15 - 19</option>
                        <option value={5}>20+</option>
                        </select>
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Sex of Pet
                        <input
                        type="text"
                        name="sex"
                        className="createPetForm-input"
                        value={pet.sex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Type of Pet
                        <input
                        type="text"
                        name="petType"
                        className="createPetForm-input"
                        value={pet.petType}
                        onChange={(e) => setPetType(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Does this pet get along with other pets?
                        <input
                        type="text"
                        name="otherPets"
                        className="createPetForm-input"
                        value={pet.otherPets}
                        onChange={(e) => setOtherPets(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Pet Personality - calm, aggressive, shy, etc...
                        <input
                        type="text"
                        name="temperament"
                        className="createPetForm-input"
                        value={pet.temperament}
                        onChange={(e) => setTemperament(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Does this pet require special care?
                        <input
                        type="text"
                        name="specialCare"
                        className="createPetForm-input"
                        value={pet.specialCare}
                        onChange={(e) => setSpecialCare(e.target.value)}
                        required
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    <label id="updatePetForm-label">
                        Any special tricks?
                        <input
                        type="text"
                        name="tricks"
                        className="createPetForm-input"
                        value={pet.tricks}
                        onChange={(e) => setTricks(e.target.value)}
                        />
                    </label>
                    </div>
                    <div id="updatePetFormdiv">
                    Available for Adoption?
                    <span>
                        <label id="updatePetForm-label">
                        Yes
                        <input
                            type="radio"
                            value={true}
                            name="adoptable"
                            checked={adoptable === true}
                            onChange={(e) => setAdoptable(true)}
                        />
                        </label>
                        <label id="updatePetFormdiv">
                        No
                        <input
                            type="radio"
                            value={false}
                            name="adoptable"
                            checked={adoptable === false}
                            onChange={(e) => setAdoptable(false)}
                        />
                        </label>
                    </span>
                    </div>
                    <div id="updatePetFormdiv">
                    Is this pet single, or part of a pet family?
                    <span>
                        <label id="updatePetForm-label">
                        Yes
                        <input
                            type="radio"
                            value={true}
                            name="single"
                            checked={single === true}
                            onChange={(e) => setSingle(true)}
                        />
                        </label>
                        <label id="updatePetForm-label">
                        No
                        <input
                            type="radio"
                            value={false}
                            name="single"
                            checked={single === false}
                            onChange={(e) => setSingle(false)}
                        />
                        </label>
                    </span>
                    </div>
                    <button id='updatePetSaveBtn' type="submit">Save Changes</button>
                </form>
                </>
            }
        </div>
    </div>
  );
};

export default UpdatePet;
