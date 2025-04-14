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

router.patch("/contacts/:id", contactController.UpdateContact);

router.delete("/contacts", contactController.DeleteContact);

export default router;
