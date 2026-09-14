# qr-barcode-scanner

How to use:

1. create a String field on table
2. Create an Edit view on this table
3. Add to the edit view:
    - a field element, picking the string field, with the `qr_barcode_scanner` fieldview. You can put this inside a container to set the dimensions of the video shown
    - another field element of the same field, with a standard fieldview (for instance, `edit`)
4. Run the view. the second field element will be set when a QR code or barcode is scanned