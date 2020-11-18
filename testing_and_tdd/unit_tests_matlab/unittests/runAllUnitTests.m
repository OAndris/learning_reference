function testResults = runAllUnitTests(varargin)
% Run all unit tests and obtain test results. Optionally with coverage measurement for specific folders.
%
% INPUTS:
%   withCoverage: [optional] string with value of 'withCoverage'
%
% OUTPUTS:
%   testResults: TestResult (structure-like) array, containing info about each test case (duration, name, passed/failed, etc.)
%
% EXAMPLES:
%   testResults = runAllUnitTests()
%   testResults = runAllUnitTests('withCoverage')
%
%==========
% NOTE 1:
% Run "methods matlab.unittest.TestCase" to see the list of available methods.
% These methods are from one of the 4 different types (choose accordingly):
%   verifySomething - if it fails, the test continues execution ("soft failure")
%   assertSomething - if it fails, it halts the current test and continues to the next test
%   fatalSomething  - if it fails, it halts the entire test suite
%   assumeSomething - used for filtering tests (filtered tests are not marked as failures)
%==========
% NOTE 2:
% It is also possible to run only a portion of tests. Learn more at "help runtests".
% Some of the possible ways:
%     1) Run all functions within folder and subfolders:
%     testResults = runtests(testpath,'IncludeSubfolders',true);
%     ---
%     2) Run a single test class:
%     testResults = runtests('CalculationsTests');
%     ---
%     3) Run a single test method of a test class:
%     testResults = runtests('CalculationsTests/criticalDeceleration');
%==========
% NOTE 3:
% If desired, some setup/teardown of tests can also be performed directly within the test classes (instead of a global setup/teardown).
% Example:
%     classdef CalculationsTests < matlab.unittest.TestCase
%         properties
%             OriginalPath
%         end
%         methods (TestMethodSetup)
%             function addToPath(testCase)
%                 testCase.OriginalPath = path;
%                 [filepath,~,~] = fileparts(mfilename('fullpath'));
%                 addpath(genpath(fullfile(filepath, '../program/calculations')));
%             end
%         end
%         methods (TestMethodTeardown)
%             function restorePath(testCase)
%                 path(testCase.OriginalPath);
%             end
%         end
%         methods (Test)
%             function testSomethingWithThisMethod(testCase)
%                 testCase.verifyEqual(...);
%             end
%         end
%     end
%==========
% FURTHER INFO:
%   https://www.mathworks.com/videos/matlab-unit-testing-framework-74975.html
%   https://www.mathworks.com/help/matlab/class-based-unit-tests.html
%   https://www.mathworks.com/help/matlab/ref/matlab.unittest.plugins.codecoverageplugin-class.html
%==========

% Handle inputs:
withCoverage = '';
if nargin == 1
    withCoverage = varargin{1};
end

% Setup test:
[testRunner, prodPath, testPath] = setupTests();

% Optional coverage report (for the folders defined here):
pathsToIncludeInCodeCoverage = {...
    fullfile(prodPath,'calculations'),...
    fullfile(prodPath,'utils')
    };
if strcmp(withCoverage, 'withCoverage')
    testRunner = extendTestRunnerWithCoverageMeasurement(testRunner, pathsToIncludeInCodeCoverage);
end

% Perform and teardown the tests:
testSuite = createTestSuite(testPath);
testResults = runTests(testRunner, testSuite);
teardownTests(prodPath, testPath)
end


%==============================
% Local functions:
%==============================
function [testRunner, prodPath, testPath] = setupTests()
import matlab.unittest.TestRunner
testRunner = TestRunner.withTextOutput;
prodPath = useRelPath('../program');
testPath = useRelPath('tests');
addpath(genpath(prodPath));
addpath(genpath(testPath));
end

function testRunner = extendTestRunnerWithCoverageMeasurement(testRunner, pathsToIncludeInCodeCoverage)
import matlab.unittest.plugins.CodeCoveragePlugin
for i = 1 : length(pathsToIncludeInCodeCoverage)
    % NOTE: 'CodeCoveragePlugin.forFolder' optionally takes a 2nd and 3rd argument: 'IncludeSubfolders',true
    testRunner.addPlugin(CodeCoveragePlugin.forFolder(pathsToIncludeInCodeCoverage(i)));
end
end

function testSuite = createTestSuite(testPath)
import matlab.unittest.TestSuite
testSuite = TestSuite.fromFolder(testPath,'IncludeSubfolders',true);
% Alternative solution, for creating a test suite from a single file:
% testSuite = TestSuite.fromFile(fullfile(testPath, 'utils', 'Bool2strTest.m'));
end

function testResults = runTests(testRunner, testSuite)
testResults = testRunner.run(testSuite);
% Alternative solution, using the built-in 'runtests' function:
% testResults = runtests(testPath,'IncludeSubfolders',true);
end

function teardownTests(prodPath, testPath)
rmpath(genpath(prodPath));
rmpath(genpath(testPath));
end

function fullpath = useRelPath(path)
[basepath,~,~] = fileparts(mfilename('fullpath'));
fullpath = fullfile(basepath, path);
end
