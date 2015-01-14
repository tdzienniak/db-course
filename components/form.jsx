(function (global) {
    var Form = React.createClass({
        render: function () {
            console.log(this.props.fields)
            return (
                
                <form className="pure-form pure-form-aligned">
                    <fieldset onChange={this.handleInputChange}>
                        <div className="pure-g">
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="customer-id">CustomerID</label>
                                    <input id="customer-id" name="CustomerID" type="text" value={this.props.fields.CustomerID} readOnly />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="company-name">Company name</label>
                                    <input id="company-name" name="CompanyName" type="text" value={this.props.fields.CompanyName} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="contact-title">Contact title</label>
                                    <input id="contact-title" name="ContactTitle" type="text" value={this.props.fields.ContactTitle} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="contact-name">Contact name</label>
                                    <input id="contact-name" type="text" name="ContactName" value={this.props.fields.ContactName} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="address">Address</label>
                                    <input id="address" type="text" name="Address" value={this.props.fields.Address} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="country">Country</label>
                                    <input id="country" type="text" name="Country" value={this.props.fields.Country} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="city">City</label>
                                    <input id="city" type="text" name="City" value={this.props.fields.City} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="region">Region</label>
                                    <input id="region" type="text" name="Region" value={this.props.fields.Region} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="postal-code">Postal code</label>
                                    <input id="postal-code" type="text" name="PostalCode" value={this.props.fields.PostalCode} />
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input id="phone" type="text" name="Phone" value={this.props.fields.Phone}/>
                                </div>
                            </div>
                            <div className="pure-u-1">
                                <div className="pure-control-group">
                                    <label htmlFor="fax">Fax</label>
                                    <input id="fax" type="text" name="Fax" value={this.props.fields.Fax}/>
                                </div>
                            </div>
                            <div className="pure-u-1 form-controls">
                                <button className="pure-button" type="button" onClick={this.props.createNewRecord}>New</button>
                                <button className="pure-button" type="button" onClick={this.props.updateRecord}>Update</button>
                                <button className="pure-button" type="button" onClick={this.props.clearFields} >Clear</button>
                                <button className="pure-button" type="button">Delete</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            );
        },
        handleInputChange: function (e) {
            this.props.setField(e.target.name, e.target.value);
        }
    });

    global.Form = Form;
})(this);