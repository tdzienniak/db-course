var App = React.createClass({
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
            <div>
                <Form fields={this.state.row} setField={this.setField} clearFields={this.clearFields} updateRecord={this.updateRecord} createNewRecord={this.createNewRecord} />
                <Grid onHeaderClick={this.getDataFromServer} onRowClick={this.fillForm} data={this.state.data} sort={this.state.sort} direction={this.state.direction} selected={this.state.selected} />
            </div>
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