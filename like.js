// Function to toggle like on a post
async function toggleLike(postId, userId) {
  try {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include auth token if needed, e.g.:
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }

    const data = await response.json();
    return data; // { likesCount, liked }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

// Example usage: update like button UI
async function handleLikeButtonClick(postId, userId, likeButtonElement, likeCountElement) {
  try {
    const result = await toggleLike(postId, userId);
    if (result.liked) {
      likeButtonElement.classList.add("liked");
    } else {
      likeButtonElement.classList.remove("liked");
    }
    likeCountElement.textContent = result.likesCount;
  } catch (error) {
    alert("Error toggling like. Please try again.");
  }
}
