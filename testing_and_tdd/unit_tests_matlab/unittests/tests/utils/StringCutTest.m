classdef StringCutTest < matlab.unittest.TestCase
    
    methods (Test)
        function canCutToFullLength(testCase)
            testCase.verifyEqual(stringCut('hellomamba', 10), 'hellomamba');
        end
        function canCutToInterimLength(testCase)
            testCase.verifyEqual(stringCut('hellomamba', 5), 'hello');
        end
        function canCutToSingleChar(testCase)
            testCase.verifyEqual(stringCut('hellomamba', 1), 'h');
        end
        function failsOnLengthAboveStringLength(testCase)
            testCase.verifyError(@()stringCut('hellomamba', 11), 'MATLAB:badsubscript');
        end
    end
    
end
