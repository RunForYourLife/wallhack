(function() {
  describe("personService", function() {
    beforeEach(module('app'));
    beforeEach(function() {
      return this.addMatchers({
        toEqualData: function(expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });
    it('should get people', inject([
      '$httpBackend', 'personService', function($httpBackend, personService) {
        var expected, negativeTestSuccess, notExpected, positiveTestSuccess;
        expected = [
          {
            name: 'foo'
          }
        ];
        notExpected = [
          {
            name: 'bar'
          }
        ];
        $httpBackend.expectGET('/people').respond(expected);
        positiveTestSuccess = function(results) {
          expect(results).toEqualData(expected);
          return results;
        };
        negativeTestSuccess = function(results) {
          expect(results).not.toEqualData(notExpected);
          return results;
        };
        personService.get().then(positiveTestSuccess).then(negativeTestSuccess);
        return $httpBackend.flush();
      }
    ]));
    return it('should get person', inject([
      '$httpBackend', 'personService', function($httpBackend, personService) {
        var expected, negativeTestSuccess, notExpected, positiveTestSuccess;
        expected = {
          name: 'foo'
        };
        notExpected = {
          name: 'bar'
        };
        $httpBackend.expectGET('/people/1').respond(expected);
        positiveTestSuccess = function(results) {
          expect(results).toEqualData(expected);
          return results;
        };
        negativeTestSuccess = function(results) {
          expect(results).not.toEqualData(notExpected);
          return results;
        };
        personService.getPerson(1).then(positiveTestSuccess).then(negativeTestSuccess);
        return $httpBackend.flush();
      }
    ]));
  });

}).call(this);
