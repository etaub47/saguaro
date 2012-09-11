import org.json.*;
import java.util.*;
import java.util.regex.*;
import java.io.*;

public class TileFiller
{
    // usage: java TileFiller <input> > <output>
    
    public static void main (String[] args) throws Exception
    {
        int[][] values = new int[16][64];
        String pattern = "(.*?/\\*JSON\\[\\*/)(.*?)(/\\*\\]JSON\\*/.*?)";        
        String filename = args[0];
        StringBuffer fileData = new StringBuffer(1000);
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        char[] buf = new char[1024];
        int numRead = 0;
        while ((numRead = reader.read(buf)) != -1) {
            String readData = String.valueOf(buf, 0, numRead);
            fileData.append(readData);
            buf = new char[1024];
        }
        reader.close();
        String s = new String(fileData.toString());
        String[] sl = s.split("\\n");
        Pattern p = Pattern.compile(pattern);
        System.out.println(sl[0]);
        System.out.println(sl[1]);
        System.out.println(sl[2]);
        Matcher matcher = p.matcher(sl[3]);
        boolean b = matcher.matches();
        String s2 = "[" + matcher.group(2) + "]";
        JSONArray topArray = new JSONArray(s2);
        JSONArray array = topArray.getJSONObject(0).getJSONArray("layer").getJSONObject(1).getJSONArray("data");
        JSONArray new_array = topArray.getJSONObject(0).getJSONArray("layer").getJSONObject(2).getJSONArray("data");        
        for (int y = 0; y < 16; y++) {
            JSONArray array2 = array.getJSONArray(y);
            for (int x = 0; x < 64; x++)
                values[y][x] = (array2.getInt(x) == 1) ? (4 * (y % 4) + (x % 4) + 1) : 0;
        }
        JSONArray[] innerArrays = new JSONArray[16];
        for (int y = 0; y < 16; y++)
            innerArrays[y] = new JSONArray(values[y]);
        JSONArray outerArray = new JSONArray(innerArrays);
        topArray.getJSONObject(0).getJSONArray("layer").getJSONObject(2).put("data", outerArray);
        System.out.println(matcher.group(1) + topArray.toString().substring(1, topArray.toString().length() - 1) + matcher.group(3));
        System.out.println(sl[4]);
        System.out.println(sl[5]);
   }
}
