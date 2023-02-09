import {AuthSelector} from '@logic/store/auth/selector';

test('AuthSelector.getAngelBikePrivilege', () => {
  expect(
    AuthSelector.getAngelBikePrivilege({auth: {privileges: []}}),
  ).toStrictEqual([]);
  expect(
    AuthSelector.getAngelBikePrivilege({
      auth: {privileges: [{permission: 'admin.route.leasing'}]},
    }),
  ).toStrictEqual([]);
  expect(
    AuthSelector.getAngelBikePrivilege({
      auth: {privileges: [{permission: 'angels.bike.unlock'}]},
    }),
  ).toStrictEqual(['angels.bike.unlock']);
  expect(
    AuthSelector.getAngelBikePrivilege({
      auth: {
        privileges: [
          {permission: 'angels.bike.unlock'},
          {permission: 'angels.bike.aaa'},
          {permission: 'dashboard.bike.dd'},
          {permission: 'system.bzzike.unlock'},
        ],
      },
    }),
  ).toStrictEqual(['angels.bike.unlock', 'angels.bike.aaa']);
});
