import bike from '../../../utils/fifteen/bike';

test('bike id parse from QR code', () => {
  expect(bike.parseQrCodeUrl(null)).toBe(null);
  expect(bike.parseQrCodeUrl('https://thisebike.com/bike_id=12345')).toBe(
    12345,
  );
  expect(bike.parseQrCodeUrl('https://thisebike.com/bike_dzaid=12345')).toBe(
    null,
  );
});
