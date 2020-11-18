function str = bool2str(b)
% Convert boolean input to strings:
%   if (b == true)  --> str = 'true' 
%   if (b == false) --> str = 'false'
% If b is an array of logicals --> str is an array with corresponding strings.

str = [];
if islogical(b)
    [m, n] = size(b);
    if (m == 1) && (n == 1)
        str = b2s(b);
    else
        str = cell(m, n);
        str = arrayfun(@(x) b2s(x), b, 'UniformOutput', false);
    end
end
end

% Bool --> string (0 --> 'true', 1 --> 'false')
function s = b2s(b)
    if b
        s = 'yes';
    else
        s = 'no';
    end
end
