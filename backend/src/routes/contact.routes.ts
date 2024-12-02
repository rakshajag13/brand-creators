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

router.get("/contacts", contactController.GetAllContacts);

router.get("/contacts/search", contactController.SearchContacts);

export default router;
