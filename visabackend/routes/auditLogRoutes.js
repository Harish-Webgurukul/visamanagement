const express = require("express");
const router = express.Router();
const { auditLogValidation } = require("../validators/auditLogValidator");
const auditLogController = require("../controllers/auditLogController");

router.post("/", auditLogValidation, auditLogController.createAuditLog);
router.get("/", auditLogController.getAuditLogs);
router.get("/:id", auditLogController.getAuditLog);
router.put("/:id", auditLogValidation, auditLogController.updateAuditLog);
router.delete("/:id", auditLogController.deleteAuditLog);

module.exports = router;
