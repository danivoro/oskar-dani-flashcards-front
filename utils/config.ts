const config = {
    baseURL:
        process.env.NODE_ENV === "production"
            ? "https://oskar-dani-flashcard-server.onrender.com"
            : "http://localhost:4000",
};

export default config;
