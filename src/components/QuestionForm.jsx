import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    category: '',
    subCategory: '',
  });
  const [correctOptionIndex, setCorrectOptionIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fonction pour vérifier si des sous-catégories existent pour une catégorie donnée
  const subCategoriesExist = (category) => {
    // Détermine si des sous-catégories existent pour la catégorie spécifiée
    switch (category) {
      case "Sports":
        // Si la catégorie est "Sports", on suppose qu'il existe des sous-catégories
        return true;
      case "Cinéma":
      case "Histoire":
      case "Sciences":
      case "Culture Générale":
      case "Arts":
        // Pour les catégories "Cinéma", "Histoire", "Sciences", "Culture Générale" et "Arts", on suppose qu'il n'y a pas de sous-catégories
        return false;
      // Ajoutez des cas pour d'autres catégories si nécessaire
      default:
        // Par défaut, on suppose qu'il n'y a pas de sous-catégories pour d'autres catégories non spécifiées
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si une option correcte est sélectionnée
    if (correctOptionIndex === -1) {
      setErrorMessage('Veuillez sélectionner l\'option correcte');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    // Vérifiez si une sous-catégorie est sélectionnée si elle existe pour la catégorie choisie
    if (formData.subCategory || !subCategoriesExist(formData.category)) {
      try {
        const response = await axios.post('http://localhost:8000/questions', {
          question: formData.question,
          options: formData.options,
          correctOptionIndex: correctOptionIndex,
          category: formData.category,
          subCategory: formData.subCategory,
        });
        if (response.data.error) {
          setErrorMessage(response.data.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        } else {
          setSuccessMessage('Question ajoutée avec succès !');
          setTimeout(() => {
            setSuccessMessage('');
            setFormData({
              question: '',
              options: ['', '', '', ''],
              category: '',
              subCategory: '',
            });
            setCorrectOptionIndex(-1);
          }, 2000);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la question :', error);
        setErrorMessage('Erreur lors de l\'ajout de la question');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    } else {
      setErrorMessage('Veuillez sélectionner une sous-catégorie valide');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });

    // Si l'option correcte est modifiée, mettez à jour l'index de l'option correcte
    if (index === correctOptionIndex) {
      setCorrectOptionIndex(-1);
    }
  };

  return (
    <div className="question-form-container">
      <div className="bg-white py-6 sm:py-8 lg:py-12 font-varela">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Ajouter une question</h2>

          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 p-4 md:p-8 bg-accent">
              <div className="w-full">
                <label htmlFor="question" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Question</label>
                <input
                  type="text"
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder="Entrez la question..."
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full">
                {[0, 1, 2, 3].map(index => (
                  <div className="flex-1" key={index}>
                    <label htmlFor={`option${index + 1}`} className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Option {String.fromCharCode(65 + index)}</label>
                    <input
                      type="text"
                      id={`option${index + 1}`}
                      value={formData.options[index]}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      placeholder={`Entrez l'option ${String.fromCharCode(65 + index)}...`}
                      required
                    />
                    <input
                      type="radio"
                      name="correctOption"
                      value={index}
                      checked={correctOptionIndex === index}
                      onChange={() => setCorrectOptionIndex(index)}
                    />
                    <label htmlFor={`correctOption${index}`}>Correct</label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="category" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Catégorie</label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: '' })}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                    required
                  >
                    <option value="">Sélectionner une catégorie...</option>
                    <option value="Sports">Sports</option>
                    <option value="Cinéma">Cinéma</option>
                    <option value="Histoire">Histoire</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Arts">Arts</option>
                    <option value="Culture Générale">Culture Générale</option>
                  </select>
                </div>

                {formData.category && (
                  <div className="w-full md:w-1/2">
                    <label htmlFor="subcategory" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Sous-catégorie</label>
                    <select
                      id="subcategory"
                      value={formData.subCategory}
                      onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                      className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                      disabled={!subCategoriesExist(formData.category)}
                    >
                      <option value="">Sélectionner une sous-catégorie...</option>
                      {formData.category === "Sports" && (
                        <>
                          <option value="Football">Football</option>
                          <option value="Basketball">Basketball</option>
                          <option value="Tennis">Tennis</option>
                        </>
                      )}
                      {/* Ajouter d'autres sous-catégories si nécessaire */}
                    </select>
                  </div>
                )}
              </div>

              <button type="submit" className="block rounded-lg bg-secondary px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-primary focus-visible:ring active:bg-gray-600 md:text-base">Soumettre</button>
              {errorMessage && (
                <div className="flex justify-center">
                  <p className="text-red-500 font-semibold">{errorMessage}</p>
                </div>
              )}
              {successMessage && (
                <div className="flex justify-center">
                  <p className="text-green-500 font-semibold">{successMessage}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
