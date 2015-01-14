var App = React.createClass({displayName: "App",
    getInitialState: function () {
        return {
            sort: 'CustomerID',
            direction: 1,
            data: [],
            row: {},
            selected: ''
        };
    },
    componentDidMount: function () {
        this.getDataFromServer(this.state.sort, this.state.direction);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(Form, {fields: this.state.row, setField: this.setField, clearFields: this.clearFields, updateRecord: this.updateRecord, createNewRecord: this.createNewRecord}), 
                React.createElement(Grid, {onHeaderClick: this.getDataFromServer, onRowClick: this.fillForm, data: this.state.data, sort: this.state.sort, direction: this.state.direction, selected: this.state.selected})
            )
        );
    },
    getDataFromServer: function (sort, direction) {
        var self = this;
        $.post('/get-records', {
            sort: sort,
            direction: direction
        }).done(function (data) {
            self.setState({
                sort: sort,
                direction: direction,
                data: data
            });
        }).fail(function () {
            alert('Wystąpił błąd podczas pobierania rekordów.');
        });
    },
    fillForm: function (id) {
        var self = this;
        $.post('/get-record', {
            id: id
        }).done(function (data) {
            self.setState({
                selected: id,
                row: data
            });
        }).fail(function () {
            alert('Nie udało się pobrać rekordu.');
        });
    },
    updateRecord: function () {
        if (this.state.selected === '') {
            return;
        }

        var self = this;

        $.post('/update-record', {
            id: this.state.selected,
            data: this.state.row
        }).done(function (data) {
            console.log(data)
            alert('ok');
            self.getDataFromServer(self.state.sort, self.state.direction)
        }).fail(function () {
            console.log(arguments)
        });
    },
    deleteRecord: function (id) {

    },
    createNewRecord: function () {
        var self = this;

        $.post('/add-record', {
            data: this.state.row
        }).done(function (data) {
            console.log(data)
            self.setState({
                selected: data
            });
            self.getDataFromServer(self.state.sort, self.state.direction)
        }).fail(function () {
            console.log(arguments)
        });
    },
    setField: function (name, value) {
        var row = this.state.row;
        row[name] = value;
        this.setState({
            row: row
        })
    },
    clearFields: function () {
        this.setState({
            row: {},
            selected: ''
        });
    }
});
(function (global) {
    var Form = React.createClass({displayName: "Form",
        render: function () {
            console.log(this.props.fields)
            return (
                
                React.createElement("form", {className: "pure-form pure-form-aligned"}, 
                    React.createElement("fieldset", {onChange: this.handleInputChange}, 
                        React.createElement("div", {className: "pure-g"}, 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "customer-id"}, "CustomerID"), 
                                    React.createElement("input", {id: "customer-id", name: "CustomerID", type: "text", value: this.props.fields.CustomerID, readOnly: true})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "company-name"}, "Company name"), 
                                    React.createElement("input", {id: "company-name", name: "CompanyName", type: "text", value: this.props.fields.CompanyName})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "contact-title"}, "Contact title"), 
                                    React.createElement("input", {id: "contact-title", name: "ContactTitle", type: "text", value: this.props.fields.ContactTitle})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "contact-name"}, "Contact name"), 
                                    React.createElement("input", {id: "contact-name", type: "text", name: "ContactName", value: this.props.fields.ContactName})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "address"}, "Address"), 
                                    React.createElement("input", {id: "address", type: "text", name: "Address", value: this.props.fields.Address})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "country"}, "Country"), 
                                    React.createElement("input", {id: "country", type: "text", name: "Country", value: this.props.fields.Country})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "city"}, "City"), 
                                    React.createElement("input", {id: "city", type: "text", name: "City", value: this.props.fields.City})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "region"}, "Region"), 
                                    React.createElement("input", {id: "region", type: "text", name: "Region", value: this.props.fields.Region})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "postal-code"}, "Postal code"), 
                                    React.createElement("input", {id: "postal-code", type: "text", name: "PostalCode", value: this.props.fields.PostalCode})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "phone"}, "Phone"), 
                                    React.createElement("input", {id: "phone", type: "text", name: "Phone", value: this.props.fields.Phone})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1"}, 
                                React.createElement("div", {className: "pure-control-group"}, 
                                    React.createElement("label", {htmlFor: "fax"}, "Fax"), 
                                    React.createElement("input", {id: "fax", type: "text", name: "Fax", value: this.props.fields.Fax})
                                )
                            ), 
                            React.createElement("div", {className: "pure-u-1 form-controls"}, 
                                React.createElement("button", {className: "pure-button", type: "button", onClick: this.props.createNewRecord}, "New"), 
                                React.createElement("button", {className: "pure-button", type: "button", onClick: this.props.updateRecord}, "Update"), 
                                React.createElement("button", {className: "pure-button", type: "button", onClick: this.props.clearFields}, "Clear"), 
                                React.createElement("button", {className: "pure-button", type: "button"}, "Delete")
                            )
                        )
                    )
                )
            );
        },
        handleInputChange: function (e) {
            this.props.setField(e.target.name, e.target.value);
        }
    });

    global.Form = Form;
})(this);
var Grid = React.createClass({displayName: "Grid",
    render: function () {
        var self = this;
        var headers = this.headerFields.map(function (field) {
            var directionClass = 'hidden';

            if (self.props.sort === field) {
                console.log(self.props.direction)
                directionClass = (self.props.direction > 0) ? 'arrow-down' : 'arrow-up';    
            }
            return (React.createElement("th", {"data-sort": (field !== '#') ? field : ''}, field, React.createElement("div", {className: directionClass})));
        });

        var records = this.props.data.map(function (record, recordIndex) {
            var cells = self.headerFields.map(function (field, index) {
                if (index === 0) {
                    return (React.createElement("td", null, recordIndex + 1));
                }

                return (React.createElement("td", null, record[field]));
            });

            var selected = (self.props.selected === record.CustomerID) ? 'selected-row' : 'dummy';

            return (React.createElement("tr", {className: selected, key: record.CustomerID, "data-id": record.CustomerID, onClick: self.handleRowClick}, cells));
        });

        return (
            React.createElement("table", {className: "pure-table pure-table-striped"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", {onClick: this.handleHeaderClick, className: "noselect"}, 
                       headers
                    )
                ), 
                React.createElement("tbody", null, 
                    records
                )
            )
        );
    },
    handleHeaderClick: function (e) {
        var sort = $(e.target).closest('th').data('sort');

        if (sort === '') {
            return;
        }
        var direction = this.props.direction;
        if (this.props.sort === sort) {
            direction *= -1;
        }
        if (sort != null) {
            this.props.onHeaderClick(sort, direction);
        }
    },
    handleRowClick: function (e) {
        this.props.onRowClick($(e.target).closest('tr').data('id'));
    },
    headerFields: ['#', 'CustomerID', 'CompanyName', 'ContactTitle', 'ContactName', 'Address', 'Country', 'City', 'Region', 'PostalCode', 'Phone', 'Fax']
});