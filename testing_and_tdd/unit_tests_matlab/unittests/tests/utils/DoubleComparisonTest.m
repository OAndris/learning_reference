classdef DoubleComparisonTest < matlab.unittest.TestCase

    methods (Test)
        function equalsAreEqualWithoutTolerance(testCase)
            testCase.verifyEqual(doubleComparison(1.5, 1.5, 0.0), true)
        end
        function equalsAreEqualWithTolerance(testCase)
            testCase.verifyEqual(doubleComparison(1.5, 1.5, 0.1), true)
        end
        function differentsAreEqualWithTolerance(testCase)
            testCase.verifyEqual(doubleComparison(1.5, 1.51, 0.011), true)
        end
        function differentsAreDifferentWithTolerance(testCase)
            testCase.verifyEqual(doubleComparison(1.5, 1.51, 0.0010), false)
        end
    end

end
