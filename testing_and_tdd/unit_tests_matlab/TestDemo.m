classdef TestDemo < matlab.unittest.TestCase
    % TestDemo
    %
    % ===========================================================================
    % BASIC USAGE
    % ===========================================================================
    % CREATING TESTS:
    % Follow the structure provided in this example.
    % Define your tests in the "methods (Test)" block.
    % In each test function, perform just these 3 actions:
    %   1) Call a piece of production code (that is being tested by the test function)
    %   2) Define the expected output of the production code
    %   3) Compare the actual and expected results using the methods of the built-in "testCase" object
    % The "testCase" object is the first, default input for all custom functions within a test class
    % Run "methods matlab.unittest.TestCase" to see the list of available methods.
    % These methods are from one of the 4 different types (choose accordingly):
    %   verifySomething - if it fails, the test continues execution ("soft failure")
    %   assertSomething - if it fails, it halts the current test and continues to the next test
    %   fatalSomething  - if it fails, it halts the entire test suite
    %   assumeSomething - used for filtering tests (filtered tests are not marked as failures)
    %
    % RUNNING TESTS:
    % Run the tests defined within this test class by instantiating and then running it:
    %   testCase1 = TestDemo;
    %   result1 = run(testCase1);  % Run all tests defined within the test class
    %   result2 = run(testCase1, 'testPositiveNumbers');  % Run a particular test method
    %
    % INTERPRETING TEST RESULTS:
    % Result ("result1") is an 1xN array of TestResult objects (N is the number of tests that were run)
    % TestResult is a structure with fields Duration, Details, Name, Passed, Failed, Incomplete
    %
    % ===========================================================================
    % ADVANCED USAGE
    % ===========================================================================
    % SETUP AND TEARDOWN:
    % Functions defined within the "methods (TestMethodSetup)" block are called once before all
    % tests to setup the test environment (e.g. add the production code's folder to path)
    % Functions defined within the "methods (TestMethodTeardown)" block are called once after all
    % tests to reset the test environment (e.g. remove the production code's folder from path).
    %
    % CREATING TEST SUITES:
    % Test suites can be used to group tests together.
    % Run "methods matlab.unittest.TestSuite" to see the list of available methods.
    % Example:
    %   import matlab.unittest.TestSuite
    %   suite1 = TestSuite.fromFolder('folder_of_tests');
    %   suite2 = TestSuite.fromFile('TestDemo.m');
    %   totalSuite = [suite1, suite2];
    %   totalResult = run(totalSuite);
    %
    % TARGETTING SPECIFIC TESTS:
    %   failedTests = totalSuite([totalResult.Failed]);
    %
    % ===========================================================================
    % FURTHER INFO
    % ===========================================================================
    %   https://www.mathworks.com/videos/matlab-unit-testing-framework-74975.html
    %   https://www.mathworks.com/help/matlab/class-based-unit-tests.html
    % ===========================================================================

    properties
        OriginalPath
    end
    
    methods (TestMethodSetup)
        % Setup before tests
        function addToPath(testCase)
            testCase.OriginalPath = path;
            addpath(fullfile(pwd, 'code_to_test'));
        end
    end
    
    methods (TestMethodTeardown)
        % Teardown after tests
        function restorePath(testCase)
            path(testCase.OriginalPath);
        end
    end
    
    methods (Test)
        % Functions defined here are the actual tests.
        function testPositiveNumbers(testCase)
            actual = add(3, 5);
            expected = 8;
            testCase.verifyEqual(actual, expected, 'AbsTol', 0);
        end
        function testNegativeNumbers(testCase)
            actual = add(-3, -5);
            expected = -8;
            testCase.verifyEqual(actual, expected, 'AbsTol', 0);
        end  
    end
end
