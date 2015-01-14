var Grid = React.createClass({
    render: function () {
        var self = this;
        var headers = this.headerFields.map(function (field) {
            var directionClass = 'hidden';

            if (self.props.sort === field) {
                console.log(self.props.direction)
                directionClass = (self.props.direction > 0) ? 'arrow-down' : 'arrow-up';    
            }
            return (<th data-sort={(field !== '#') ? field : ''}>{field}<div className={directionClass}></div></th>);
        });

        var records = this.props.data.map(function (record, recordIndex) {
            var cells = self.headerFields.map(function (field, index) {
                if (index === 0) {
                    return (<td>{recordIndex + 1}</td>);
                }

                return (<td>{record[field]}</td>);
            });

            var selected = (self.props.selected === record.CustomerID) ? 'selected-row' : 'dummy';

            return (<tr className={selected} key={record.CustomerID} data-id={record.CustomerID} onClick={self.handleRowClick}>{cells}</tr>);
        });

        return (
            <table className="pure-table pure-table-striped">
                <thead>
                    <tr onClick={this.handleHeaderClick} className="noselect">
                       {headers}
                    </tr>
                </thead>
                <tbody>
                    {records}
                </tbody>
            </table>
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