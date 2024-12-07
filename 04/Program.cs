internal class Program
{
    private const string FilePath = "../../../input";
    //private const string FilePath = "../../../input_sample";

    private static readonly char[] SearchWord = "XMAS".ToCharArray();
    private static readonly char[] SearchWordBackwards = SearchWord.Reverse().ToArray();

    private static void Main(string[] args)
    {
        var data = ReadData();

        var countPart1 = GetCountPart1(data, SearchWord) + GetCountPart1(data, SearchWordBackwards);
        Console.WriteLine($"Part1: {countPart1}");

        var countPart2 = GetCountPart2(data);
        Console.WriteLine($"Part2: {countPart2}");
    }

    private static char[,] ReadData()
    {
        using var fs = new FileStream(FilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
        using var sr = new StreamReader(fs);
        var strings = sr
            .ReadToEnd()
            .ToUpperInvariant()
            .Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var lenX = strings.Length;
        var lenY = strings[0].Length;
        var data = new char[lenX, lenY];
        for (var i = 0; i < lenX; i++)
        for (var j = 0; j < lenY; j++)
            data[i, j] = strings[i][j];

        return data;
    }

    private static uint GetCountPart1(char[,] data, char[] searchWord)
    {
        uint count = 0;
        for (uint iX = 0; iX < data.GetLength(0); iX++)
        for (uint iY = 0; iY < data.GetLength(1); iY++)
            count += GetCountPart1At(data, iX, iY, searchWord);

        return count;
    }

    private static uint GetCountPart1At(char[,] data, uint iX, uint iY, char[] searchWord)
    {
        return
            (IsSearchWordHorizontalAt(data, iX, iY, searchWord) ? 1u : 0u) +
            (IsSearchWordVerticalAt(data, iX, iY, searchWord) ? 1u : 0u) +
            (IsSearchWordDiagonalDownAt(data, iX, iY, searchWord) ? 1u : 0u) +
            (IsSearchWordDiagonalUpAt(data, iX, iY, searchWord) ? 1u : 0u);
    }

    private static bool IsSearchWordHorizontalAt(char[,] data, uint iX, uint iY, char[] searchWord)
    {
        var lenX = data.GetLength(0);
        var searchLen = searchWord.GetLength(0);
        if (iX + searchLen > lenX) return false;

        for (uint offset = 0; offset < searchLen; offset++)
            if (data[iX + offset, iY] != searchWord[offset])
                return false;
        return true;
    }

    private static bool IsSearchWordVerticalAt(char[,] data, uint iX, uint iY, char[] searchWord)
    {
        var lenY = data.GetLength(1);
        var searchLen = searchWord.Length;
        if (iY + searchLen > lenY) return false;

        for (uint offset = 0; offset < searchLen; offset++)
            if (data[iX, iY + offset] != searchWord[offset])
                return false;

        return true;
    }

    private static bool IsSearchWordDiagonalDownAt(char[,] data, uint iX, uint iY, char[] searchWord)
    {
        var lenX = data.GetLength(0);
        var lenY = data.GetLength(1);
        var searchLen = searchWord.Length;
        if (iX + searchLen > lenX) return false;
        if (iY + searchLen > lenY) return false;

        for (uint offset = 0; offset < searchLen; offset++)
            if (data[iX + offset, iY + offset] != searchWord[offset])
                return false;
        return true;
    }

    private static bool IsSearchWordDiagonalUpAt(char[,] data, uint iX, uint iY, char[] searchWord)
    {
        var lenX = data.GetLength(0);
        var searchLen = searchWord.Length;
        if (iX + searchLen > lenX) return false;
        if (iY - searchLen + 1 < 0) return false;

        for (uint offset = 0; offset < searchLen; offset++)
            if (data[iX + offset, iY - offset] != searchWord[offset])
                return false;
        return true;
    }

    private static uint GetCountPart2(char[,] data)
    {
        uint count = 0;
        for (uint iX = 1; iX < data.GetLength(0) - 1; iX++)
        {
            for (uint iY = 1; iY < data.GetLength(1) - 1; iY++)
            {
                if (IsSearchPatternAt(data, iX, iY))
                {
                    count++;
                }
            }
        }

        return count;
    }

    private static bool IsSearchPatternAt(char[,] data, uint iX, uint iY)
    {
        if (data[iX, iY] != 'A') return false;
        
        var upperLeft = data[iX - 1, iY - 1];
        var upperRight = data[iX + 1, iY - 1];
        var lowerLeft = data[iX - 1, iY + 1];
        var lowerRight = data[iX + 1, iY + 1];

        return
            ((upperLeft == 'M' && lowerRight == 'S') || (upperLeft == 'S' && lowerRight == 'M')) &&
            ((upperRight == 'M' && lowerLeft == 'S') || (upperRight == 'S' && lowerLeft == 'M'));
    }
}