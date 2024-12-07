using System.Text.RegularExpressions;

internal class Program
{
    private const string FilePath = "../../../input";
    //private const string FilePath = "../../../input_sample";

    private static void Main(string[] args)
    {
        var data = ReadData();

        var solutionPart1 = SolvePart1(data);
        Console.WriteLine($"Part1: {solutionPart1}");

        var solutionPart2 = SolvePart2(data);
        Console.WriteLine($"Part2: {solutionPart2}");
    }

    private static string ReadData()
    {
        using var fs = new FileStream(FilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        using var sr = new StreamReader(fs);
        return sr.ReadToEnd();
    }

    private static int SolvePart1(string data)
    {
        var mulRegex = new Regex(@"mul\((\d{1,3})\,(\d{1,3})\)");
        var matches = mulRegex.Matches(data);
        var totalSum = 0;
        foreach (Match match in matches)
        {
            var operand1 = int.Parse(match.Groups[1].Value);
            var operand2 = int.Parse(match.Groups[2].Value);
            var result = operand1 * operand2;
            totalSum += result;
        }

        return totalSum;
    }

    private static int SolvePart2(string data)
    {
        var enabledRegex = new Regex(@"do\(\)");
        var enabledMatches = enabledRegex.Matches(data);
        var enabledIndexes = enabledMatches.Select(match => match.Index).ToList();

        var disabledRegex = new Regex(@"don't\(\)");
        var disabledMatches = disabledRegex.Matches(data);
        var disabledIndexes = disabledMatches.Select(match => match.Index).ToList();

        var mulRegex = new Regex(@"mul\((\d{1,3})\,(\d{1,3})\)");
        var mulMatches = mulRegex.Matches(data);

        var enabled = true;
        var totalSum = 0;
        foreach (Match match in mulMatches)
        {
            var currentIndex = match.Index;
            ApplyDoDontInstructions(currentIndex, enabledIndexes, disabledIndexes, ref enabled);
            if (!enabled) continue;

            var operand1 = int.Parse(match.Groups[1].Value);
            var operand2 = int.Parse(match.Groups[2].Value);
            var result = operand1 * operand2;
            totalSum += result;
        }

        return totalSum;
    }

    private static void ApplyDoDontInstructions(int currentIndex, IList<int> enabledIndexes, IList<int> disabledIndexes,
        ref bool enabled)
    {
        bool considerEnabled = true, considerDisabled = true;
        while (considerEnabled || considerDisabled)
        {
            considerEnabled = enabledIndexes.Any() && enabledIndexes[0] < currentIndex;
            considerDisabled = disabledIndexes.Any() && disabledIndexes[0] < currentIndex;

            if (considerEnabled && considerDisabled)
            {
                // Check which comes first
                if (enabledIndexes[0] < disabledIndexes[0])
                {
                    enabled = true;
                    enabledIndexes.RemoveAt(0);
                }
                else
                {
                    enabled = false;
                    disabledIndexes.RemoveAt(0);
                }
            }
            else if (considerEnabled)
            {
                enabled = true;
                enabledIndexes.RemoveAt(0);
            }
            else if (considerDisabled)
            {
                enabled = false;
                disabledIndexes.RemoveAt(0);
            }
        }
    }
}