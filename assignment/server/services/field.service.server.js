/**
 * Created by OWNER on 3/14/2016.
 */
module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function getFieldsForFormId(req, res) {
        var formId = req.params.formId;
        var fields = fieldModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.findField(formId, fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId, fieldId);
        res.send(200);
    }

    function addFieldToForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        field = fieldModel.createField(formId, field);
        res.json(field);
    }

    function updateFieldById(req, res) {
        var fields = req.body;
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        return res.json(fieldModel.updateField(formId, fieldId, fields));
    }
};