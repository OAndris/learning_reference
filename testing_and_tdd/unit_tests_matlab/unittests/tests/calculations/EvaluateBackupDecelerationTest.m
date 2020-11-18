classdef EvaluateBackupDecelerationTest < matlab.unittest.TestCase
    
    methods (Test)
        function isAboveUpperLimit(testCase)
            testCase.verifyEqual(evaluateBackupDeceleration(5, 5.11), 'green');
        end
        function isAtUpperLimit(testCase)
            testCase.verifyEqual(evaluateBackupDeceleration(5, 5.10), 'green');
        end
        function isBelowUpperLimit(testCase)
            testCase.verifyEqual(evaluateBackupDeceleration(5, 5.09), 'yellow');
        end
        function isAtLowerLimit(testCase)
            testCase.verifyEqual(evaluateBackupDeceleration(5, 4.90), 'yellow');
        end
        function isBelowLowerLimit(testCase)
            testCase.verifyEqual(evaluateBackupDeceleration(5, 4.89), 'red');
        end
    end
    
end
