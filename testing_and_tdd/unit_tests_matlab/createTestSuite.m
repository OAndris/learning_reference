function createTestSuite()
import matlab.unittest.TestSuite

% Create test suite from folder:
% run(TestSuite.fromFolder('additional_tests'));

% Create test suite from file:
% run(TestSuite.fromFile('TestDemo.m'));

% Create test suites and combine them together:
suite1 = TestSuite.fromFolder('additional_tests');
suite2 = TestSuite.fromFile('TestDemo.m');
totalResult = run([suite1, suite2]);
end
