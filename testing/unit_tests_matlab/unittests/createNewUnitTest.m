function createNewUnitTest(varargin)
% Create a new unit test template file for a specific production file.
%
% INPUTS:
%   filename: [optional] string containing the name of a production file. If omitted, you'll be prompted for a name
%
% OUTPUTS:
%   (none, but a test template file will be generated)
%
% EXAMPLES:
%   createNewUnitTest()
%   createNewUnitTest('nameOfProductionFileToTest')
%

prodFileName = '';
if nargin == 0
    prodFileName = inputdlg('What is the name of the production file you want to test?', 'Unit Test Template File Generator');
    if isempty(prodFileName)
        return
    end
    prodFileName = prodFileName{1};
elseif nargin == 1
    prodFileName = varargin{1};
end

testFileName = [upper(prodFileName(1)), prodFileName(2:end), 'Test'];
[basepath,~,~] = fileparts(mfilename('fullpath'));
absPathOfTestFile = fullfile(basepath, [testFileName, '.m']);
fid = fopen(absPathOfTestFile, 'w');

fileContent = {['classdef ', testFileName, ' < matlab.unittest.TestCase']
    ''
    '    methods (Test)'
    '        function tc1(testCase)'
    ['            testCase.verifyEqual(', prodFileName , '(), expectedResult)']
    '        end'
    '    end'
    ''
    'end'};
fprintf(fid, sprintf('%s\n', fileContent{:}));
fclose(fid);
edit (absPathOfTestFile)
end
