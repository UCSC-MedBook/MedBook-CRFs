testAsyncMulti('Sorting - direction', [function (test, expect) {
  var table = Blaze.renderWithData(
    Template.reactiveTable,
    {collection: rows},
    document.body
  );
  test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Ada Lovelace", "initial first row");
  test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Carl Friedrich Gauss", "initial second row");
  test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Grace Hopper", "initial fourth row");

  var expectAscending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Ada Lovelace", "ascending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Carl Friedrich Gauss", "ascending second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Grace Hopper", "ascending fourth row");
    Blaze.remove(table);
  });

  var expectDescending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Nikola Tesla", "descending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Marie Curie", "descending second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Claude Shannon", "descending fourth row");

    $('.reactive-table th:first-child').click();
    Meteor.setTimeout(expectAscending, 0);
  });

  $('.reactive-table th:first-child').click();
  Meteor.setTimeout(expectDescending, 0);
}]);

testAsyncMulti('Sorting - column', [function (test, expect) {
  var table = Blaze.renderWithData(
    Template.reactiveTable,
    {collection: collection},
    document.body
  );
  test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Ada Lovelace", "initial first row");
  test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Carl Friedrich Gauss", "initial second row");
  test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Grace Hopper", "initial fourth row");

  var expectSecondColumnDescending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Nikola Tesla", "2nd column descending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Grace Hopper", "2nd column descending second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Marie Curie", "2nd column descending fourth row");
    Blaze.remove(table);
  });

  var expectSecondColumn = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Carl Friedrich Gauss", "2nd column first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Ada Lovelace", "2nd column second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Claude Shannon", "2nd column fourth row");

    $('.reactive-table th:nth-child(2)').click();
    Meteor.setTimeout(expectSecondColumnDescending, 0);
  });

  $('.reactive-table th:nth-child(2)').click();
  Meteor.setTimeout(expectSecondColumn, 0);
}]);

testAsyncMulti('Sorting - after adding new column with fieldIds', [function (test, expect) {
  var insert1stField = new ReactiveVar(false);
  Template.testReactivity.helpers({
    collection: function () {
      return collection;
    },
    settings: function () {
      if (insert1stField.get()) {
        return {
          fields: [
            {fieldId: 'name', key: 'name', label: 'Name'},
            {fieldId: 'score', key: 'score', label: 'Score'}
           ]
        }
      } else {
        return {
          fields: [
            {fieldId: 'score', key: 'score', label: 'Score'},
          ]
        }
      }
    }
  });

  var table = Blaze.renderWithData(
    Template.testReactivity,
    {},
    document.body
  );

  test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "0", "initial first row");
  test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "5", "initial second row");
  test.equal($('.reactive-table tbody tr:nth-child(5) td:first-child').text(), "10", "initial fifth row");

  var expectSecondColumnStillDescending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:nth-child(2)').text(), "15", "2nd column descending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:nth-child(2)').text(), "10", "2nd column descending second row");
    test.equal($('.reactive-table tbody tr:nth-child(5) td:nth-child(2)').text(), "5", "2nd column descending fifth row");
    Blaze.remove(table);
  });

  var expectDescending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "15", "descending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "10", "descending second row");
    test.equal($('.reactive-table tbody tr:nth-child(5) td:first-child').text(), "5", "descending fifth row");

    insert1stField.set(true);
    Meteor.setTimeout(expectSecondColumnStillDescending, 0);
  });

  $('.reactive-table th:first-child').click();
  Meteor.setTimeout(expectDescending, 0);
}]);

testAsyncMulti('Sorting - server-side', [function (test, expect) {
  var table = Blaze.renderWithData(
    Template.reactiveTable,
    {collection: 'collection', fields: ['name', 'score']},
    document.body
  );

  var expectSecondColumn = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Carl Friedrich Gauss", "2nd column first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Ada Lovelace", "2nd column second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Claude Shannon", "2nd column fourth row");

    Blaze.remove(table);
  });

  var expectAscending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Ada Lovelace", "ascending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Carl Friedrich Gauss", "ascending second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Grace Hopper", "ascending fourth row");

    $('.reactive-table th:nth-child(2)').click();
    Meteor.setTimeout(expectSecondColumn, 500);
  });

  var expectDescending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Nikola Tesla", "descending first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Marie Curie", "descending second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Claude Shannon", "descending fourth row");

    $('.reactive-table th:first-child').click();
    Meteor.setTimeout(expectAscending, 500);
  });

  var expectDefaultAscending = expect(function () {
    test.equal($('.reactive-table tbody tr:first-child td:first-child').text(), "Ada Lovelace", "initial first row");
    test.equal($('.reactive-table tbody tr:nth-child(2) td:first-child').text(), "Carl Friedrich Gauss", "initial second row");
    test.equal($('.reactive-table tbody tr:nth-child(4) td:first-child').text(), "Grace Hopper", "initial fourth row");

    $('.reactive-table th:first-child').click();
    Meteor.setTimeout(expectDescending, 500);
  });

  Meteor.setTimeout(expectDefaultAscending, 500);
}]);
