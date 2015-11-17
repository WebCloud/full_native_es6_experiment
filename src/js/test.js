import Base from './Base';

QUnit.test('Hey', function(assert) {
  let base = new Base('a', 'b');
  assert.ok( base.itemTemplate === 'a');
});
