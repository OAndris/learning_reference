function [allTestsPassed, testResults] = runAllUnitTests(varargin)
% Run all unit tests and obtain test results. Optionally with coverage measurement for specific folders.
%
% INPUTS - Any of the following strings may (optionally) be passed in as argument, in any order and combination:
%   'testReportPdf'  - Generate the test report in PDF file format
%   'testReportXml'  - Generate the test report in XML file format (JUnit-style)
%   'testReportTap'  - Generate the test report in TAP file format
%   'coverageMatlab' - Generate the code coverage report in Matlab popup window (Matlab profiler)
%   'coverageXml'    - Generate the code coverage report in Cobertura XML file format
%
% OUTPUTS:
%   allTestsPassed - Logical (boolean), true if all tests were passed, false otherwise
%   testResults    - TestResult (structure-like) array, containing info about each test case (duration, name, passed/failed, etc.)
%
% EXAMPLES:
%   [allTestsPassed, testResults] = runAllUnitTests()
%   [allTestsPassed, testResults] = runAllUnitTests('testReportPdf')
%   [allTestsPassed, testResults] = runAllUnitTests('coverageMatlab')
%   [allTestsPassed, testResults] = runAllUnitTests('coverageXml')
%   [allTestsPassed, testResults] = runAllUnitTests('testReportPdf', 'coverageMatlab')
%   [allTestsPassed, testResults] = runAllUnitTests('coverageMatlab', 'testReportPdf')
%   [allTestsPassed, testResults] = runAllUnitTests('testReportPdf', 'coverageMatlab', 'coverageXml')
%   FULL EXAMPLE:
%   [allTestsPassed, testResults] = runAllUnitTests('testReportPdf', 'testReportXml', 'testReportTap', 'coverageMatlab', 'coverageXml')
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
% NOTE 4:
% For a quick overview of the test results, use "table(testResults)" in the Command Window.
%==========
% FURTHER INFO:
%   https://www.mathworks.com/videos/matlab-unit-testing-framework-74975.html
%   https://www.mathworks.com/help/matlab/class-based-unit-tests.html
%   https://www.mathworks.com/help/matlab/ref/matlab.unittest.testcase-class.html
%   https://www.mathworks.com/help/matlab/ref/matlab.unittest.plugins.codecoverageplugin-class.html
%==========

% Setup test:
[testRunner, prodPath, testPath, artifactPath] = setupTests();

% Define folders to be included in the (optional) code coverage report:
pathsToIncludeInCodeCoverage = {...
    fullfile(prodPath,'calculations'),...
    fullfile(prodPath,'utils')
    };

% Handle optional arguments:
if isCalledWith('testReportPdf', varargin)
    testRunner = addTestReportPDF(testRunner, artifactPath, 'testReport.pdf');
end
if isCalledWith('testReportXml', varargin)
    testRunner = addTestReportXML(testRunner, artifactPath, 'testReport.xml');
end
if isCalledWith('testReportTap', varargin)
    testRunner = addTestReportTAP(testRunner, artifactPath, 'testReport.tap');
end
if isCalledWith('coverageMatlab', varargin)
    testRunner = addCoverageReportMatlab(testRunner, pathsToIncludeInCodeCoverage);
end
if isCalledWith('coverageXml', varargin)
    testRunner = addCoverageReportCoberturaXML(testRunner, pathsToIncludeInCodeCoverage, artifactPath, 'coverage.xml');
end

% Perform and teardown the tests, post-process test results:
testSuite = createTestSuite();
testResults = runTests(testRunner, testSuite);
teardownTests(prodPath, testPath)
allTestsPassed = postProcessTestResults(testResults, artifactPath);
end


%==============================
% Local functions:
%==============================
function [testRunner, prodPath, testPath, artifactPath] = setupTests()
import matlab.unittest.TestRunner
testRunner = TestRunner.withTextOutput;  % INFO: https://www.mathworks.com/help/matlab/ref/matlab.unittest.testrunner.withtextoutput.html
prodPath = useRelPath('../program');
testPath = useRelPath('tests');
artifactPath = useRelPath('artifacts');
addpath(genpath(prodPath));
addpath(genpath(testPath));
if ~exist(artifactPath, 'dir')
    mkdir(artifactPath)
end
end

function testSuite = createTestSuite()
import matlab.unittest.TestSuite
testSuite = TestSuite.fromPackage('unittests','IncludingSubpackages',true);
% =====
% Alternative solutions for creating a test suite:
% =====
% testSuite = TestSuite.fromClass(?Bool2strTest);
% testSuite = TestSuite.fromFolder(testPath,'IncludeSubfolders',true);
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

function allTestsHavePassed = postProcessTestResults(testResults, artifactPath)
allTestsHavePassed = all([testResults.Passed]);
if ~allTestsHavePassed
    save(fullfile(artifactPath,'results.mat'), 'testResults')
end
end

function fullpath = useRelPath(path)
[basepath,~,~] = fileparts(mfilename('fullpath'));
fullpath = fullfile(basepath, path);
end

function isCalledWithFlag = isCalledWith(flag, varargin)
flags = varargin{1};
isCalledWithFlag = any(cellfun(@(x) strcmp(x,flag), flags));
end

%==============================
% PLUGINS:
%==============================
function testRunner = addTestReportPDF(testRunner, artifactPath, nameOfPdf)
import matlab.unittest.plugins.TestReportPlugin
testRunner.addPlugin(TestReportPlugin.producingPDF(fullfile(artifactPath, nameOfPdf)));
end

function testRunner = addTestReportXML(testRunner, artifactPath, nameOfXml)
import matlab.unittest.plugins.XMLPlugin
testRunner.addPlugin(XMLPlugin.producingJUnitFormat(fullfile(artifactPath, nameOfXml)));
end

function testRunner = addTestReportTAP(testRunner, artifactPath, nameOfTap)
import matlab.unittest.plugins.TAPPlugin
import matlab.unittest.plugins.ToFile
testRunner.addPlugin(TAPPlugin.producingOriginalFormat(ToFile(fullfile(artifactPath, nameOfTap))));
end

function testRunner = addCoverageReportMatlab(testRunner, pathsToIncludeInCodeCoverage)
import matlab.unittest.plugins.CodeCoveragePlugin
for i = 1 : length(pathsToIncludeInCodeCoverage)
    % NOTE: for recursivity, 'CodeCoveragePlugin.forFolder' optionally takes an additional key-value argument pair: 'IncludeSubfolders',true
    testRunner.addPlugin(CodeCoveragePlugin.forFolder(pathsToIncludeInCodeCoverage(i)));
end
end

function testRunner = addCoverageReportCoberturaXML(testRunner, pathsToIncludeInCodeCoverage, artifactPath, nameOfCoberturaXml)
import matlab.unittest.plugins.CodeCoveragePlugin
import matlab.unittest.plugins.codecoverage.CoberturaFormat
for i = 1 : length(pathsToIncludeInCodeCoverage)
    testRunner.addPlugin(CodeCoveragePlugin.forFolder(pathsToIncludeInCodeCoverage(i),'Producing',CoberturaFormat(fullfile(artifactPath, nameOfCoberturaXml))));
end
end
