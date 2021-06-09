({
    handleChange: function(component, event, helper) {
        var data = [];
        var cols = component.get("v.columns");
        var row = [];
        while(row.length < cols) {
            row.push("Column "+(row.length+1));
        }
        while(data.length < 10) {
            data.push(row);
        }
        component.set("v.rows", data);
    }
})