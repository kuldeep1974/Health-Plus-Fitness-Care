import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NutritionCard = () => {
  const [food, setFood] = useState("");
  const navigate = useNavigate();
  const [nutritionData, setNutritionData] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const nutritionApiKey = "SXufljTLgaz/QKReOXXkZA==3Q17aKdN2KhXctwQ";
  const unsplashApiKey = "KWzGK8etFFlgpxnzYGg14CfjN_X66y-3llPU2xlI05U";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchNutrition = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          headers: { "X-Api-Key": nutritionApiKey },
        }
      );
      const data = await response.json();
      if (data.length > 0) setNutritionData(data);
      else setNutritionData([]);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFoodImage = async (foodName) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${foodName}&client_id=${unsplashApiKey}`
      );
      const data = await response.json();
      return data?.urls?.small || "assets/images/default-food.jpg";
    } catch (error) {
      console.error("Error fetching food image:", error);
      return "assets/images/default-food.jpg";
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      if (nutritionData.length > 0) {
        const images = await Promise.all(
          nutritionData.map((item) => fetchFoodImage(item.name))
        );
        setFoodImages(images);
      }
    };
    loadImages();
  }, [nutritionData]);

  const handleSearch = () => {
    setNutritionData([]);
    setFoodImages([]);
    fetchNutrition(food);
  };

  const styles = {
    container: {
      padding: "40px 20px",
      background: "#1e1e1e",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    searchBar: {
      position: "sticky",
      top: "0",
      background: "#1e1e1e",
      paddingBottom: "30px",
      zIndex: 10,
    },
    heading: {
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#4e7ed9",
    },
    inputGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },
    input: {
      padding: "12px",
      width: "300px",
      borderRadius: "10px",
      border: "1px solid #444",
      outline: "none",
      backgroundColor: "#333",
      color: "#fff",
    },
    button: {
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #4e7ed9, #ff61a6)",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "20px",
      marginTop: "30px",
    },
    card: {
      backgroundColor: "#2c2c2c",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
      height: "250px",
    },
    imageContainer: {
      width: "40%",
      height: "100%",
      backgroundColor: "#1a1a1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    content: {
      padding: "20px",
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      marginBottom: "10px",
      textTransform: "capitalize",
    },
    details: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
    },
    noResults: {
      textAlign: "center",
      marginTop: "50px",
      color: "#aaa",
      fontSize: "1.2rem",
    },
    loading: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "50px",
      color: "#ccc",
    },

    // Responsive tweaks
    "@media(maxWidth: 768px)": {
      card: {
        flexDirection: "column",
        height: "auto",
      },
      imageContainer: {
        width: "100%",
        height: "200px",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBar}>
        <h1 style={styles.heading}>Nutrition Finder</h1>
        <div style={styles.inputGroup}>
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Search for food..."
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : (
        <div style={styles.grid}>
          {nutritionData.length > 0 ? (
            nutritionData.map((item, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.imageContainer}>
                  <img
                    src={foodImages[index] || "assets/images/default-food.jpg"}
                    alt={item.name}
                    style={styles.image}
                  />
                </div>
                <div style={styles.content}>
                  <h2 style={styles.title}>{item.name}</h2>
                  <div style={styles.details}>
                    <p><strong>Calories:</strong> {item.calories}</p>
                    <p><strong>Serving Size:</strong> {item.serving_size_g} g</p>
                    <p><strong>Fat:</strong> {item.fat_total_g} g</p>
                    <p><strong>Protein:</strong> {item.protein_g} g</p>
                    <p><strong>Carbs:</strong> {item.carbohydrates_total_g} g</p>
                    <p><strong>Sugar:</strong> {item.sugar_g} g</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No data available. Try searching for another food item.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionCard;
