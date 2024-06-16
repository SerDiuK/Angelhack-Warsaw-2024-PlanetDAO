# PlanetDAO Project - AngelHack Warsaw 2024

Welcome to the repository for the PlanetDAO project, developed for AngelHack Warsaw 2024. You can try it out at [planet-dao.vercel.app](https://planet-dao.vercel.app), where it runs on the Avalanche subnet. Note that since this is running in a GitHub Codespace, it might be offline occasionally.

## Instructions for Local Usage

1. **Install Dependencies**:
    ```sh
    npm install
    ```

2. **Build the Project**:
    ```sh
    npm run build
    ```

3. **Run the Development Server**:
    ```sh
    npm run dev
    ```

This project is already configured to use the Avalanche subnet.

## Running Locally with HardHat

Alternatively, you can also run the project using a local HardHat node.

1. **Start the HardHat Node**:
    ```sh
    npx hardhat node
    ```

2. **Deploy Contracts Locally**:
    ```sh
    npm run deploy:local
    ```

Use the `PlanetDAO` and `UserRegistry` addresses from the deploy script in your `.env.local` file.

---

Feel free to contribute or report any issues!
