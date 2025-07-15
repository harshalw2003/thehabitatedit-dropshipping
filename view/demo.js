function solve(input) {
    const lines = input.trim().split('\n');
    const N = parseInt(lines[0]);
    const M = parseInt(lines[1]);
    const A = lines[2].split(' ').map(Number);
    
    // Memoization for efficiency
    const memo = new Map();
    
    function f(x) {
        if (x === 0) return 1;
        if (memo.has(x)) return memo.get(x);
        
        let sum = 0;
        for (let i = 0; i < M; i++) {
            sum += f(Math.floor(x / A[i]));
        }
        
        memo.set(x, sum);
        return sum;
    }
    
    return f(N);
}

// Test with the example from Case 2
const testInput = `3
3
3 2 3 3`;

console.log(solve(testInput)); // Should output 4