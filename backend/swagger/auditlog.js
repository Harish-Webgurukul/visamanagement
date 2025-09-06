/**
 * @swagger
 * tags:
 *   name: AuditLog
 *   description: Audit log APIs
 */

/**
 * @swagger
 * /auditlog:
 *   get:
 *     summary: Get all audit logs
 *     tags: [AuditLog]
 *     responses:
 *       200:
 *         description: List of audit logs
 *
 *   post:
 *     summary: Create an audit log
 *     tags: [AuditLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditLog'
 *     responses:
 *       201:
 *         description: Audit log created
 */

/**
 * @swagger
 * /auditlog/{id}:
 *   get:
 *     summary: Get audit log by ID
 *     tags: [AuditLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audit log details
 *
 *   put:
 *     summary: Update an audit log
 *     tags: [AuditLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuditLog'
 *     responses:
 *       200:
 *         description: Audit log updated
 *
 *   delete:
 *     summary: Delete an audit log
 *     tags: [AuditLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Audit log deleted
 */
