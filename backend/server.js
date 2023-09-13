import express from "express";
import cors from "cors";

import animalRoutes from "./routers/animalRoutes.js";
import donationRoutes from "./routers/donationRoutes.js";
import noticeRoutes from "./routers/noticeRoutes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
//napravi public staticnim folderom- doda endpoint svemu u folderu-- mos onda na frontendu koristit
app.use("/public", express.static("public"));

app.use("/animals", animalRoutes);
app.use("/donations", donationRoutes);
app.use("/notices", noticeRoutes);

// app.use((res) => {
//   res.status(404).json({ message: "Non existing route" });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
