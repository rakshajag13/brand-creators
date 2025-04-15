import { Router } from "express";
import { contactController } from "../controllers/contact.controller";
import { contactSchema } from "../validators/contact.validator";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/contacts",
  validate(contactSchema),
  contactController.CreateContact
);
router.get("/contactsByEmail/:email", contactController.GetContactByEmail);

router.get("/", contactController.GetAllContacts);

router.get("/search", contactController.SearchContacts);

router.patch("/:id", contactController.UpdateContact);

router.delete("/", contactController.DeleteContact);

export default router;
