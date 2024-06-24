document.getElementById("submitBtn").onclick = async () => {
  const fileInput = document.getElementById("imageUpload");
  if (fileInput.files.length === 0) {
    alert("Please select an image file.");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    document.getElementById(
      "result"
    ).textContent += `Predicted Disease: ${data.disease}`;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").textContent =
      "Error occurred while predicting the disease.";
  }
};