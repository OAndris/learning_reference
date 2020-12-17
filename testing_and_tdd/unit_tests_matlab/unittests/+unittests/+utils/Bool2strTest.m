classdef Bool2strTest < matlab.unittest.TestCase
    
    methods (Test)
        function falseIsNo(testCase)
            testCase.verifyEqual(bool2str(false), 'no')
        end
        function trueIsYes(testCase)
            testCase.verifyEqual(bool2str(true), 'yes')
        end
        function zeroIsEmpty(testCase)
            testCase.verifyEqual(bool2str(0), [])
        end
        function oneIsEmpty(testCase)
            testCase.verifyEqual(bool2str(1), [])
        end
        function arrayOfBoolsIsCellOfYesNo(testCase)
            testCase.verifyEqual(bool2str([true false true]), {'yes', 'no', 'yes'})
        end
        function stringIsEmpty(testCase)
            testCase.verifyEqual(bool2str('abc'), [])
        end
        function arrayOfStringsIsEmpty(testCase)
            testCase.verifyEqual(bool2str(['abc','def']), [])
        end
        function structIsEmpty(testCase)
            testCase.verifyEqual(bool2str(struct('a', 1)), [])
        end
    end
    
end
