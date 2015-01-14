use northwind;
go
if object_id('dbo.usp_AddCustomer') is not null
    drop proc dbo.usp_AddCustomer;
go

create proc dbo.usp_AddCustomer
    @CompanyName as nvarchar(40) = null,
    @ContactName as nvarchar(30) = null,
    @ContactTitle as nvarchar(30) = null,
    @Address as nvarchar(60) = null,
    @City as nvarchar(15) = null,
    @Region as nvarchar(15) = null,
    @PostalCode as nvarchar(10) = null,
    @Country as nvarchar(15) = null,
    @Phone as nvarchar(24) = null,
    @Fax as nvarchar(24) = null,
    @out nvarchar(5) = null output
as
    if @CompanyName is null
    begin
        raiserror('CompanyName cannot be null', 16, 1);
        return;
    end

    declare @id as nvarchar(5);

    way:
        set @id = substring(cast (newid() as nvarchar(60)), 1, 5);
    if exists(select * from Customers where CustomerID = @id) goto way;

    insert into Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax) values (@id, @CompanyName, @ContactName, @ContactTitle, @Address, @City, @Region, @PostalCode, @Country, @Phone, @Fax
    );

    set @out = @id;
    return;
go