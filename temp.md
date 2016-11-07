# java反射
## 描述
        java.lang.Class   java.lang.reflect
        Java反射指可以运行时加载、探知、使用编译期间完全未知的classes，即java程序可以加载一个
    运行时才知名称的clas是，获悉其完整构造，并生成其对象实体、对field设值、或调用其methods。
        主要功能： 在运行时判断任意一个对象所属的类；在运行时构造任意一个类的对象；在运行时判
    断任意一个类所具有的成员变量和方法；在运行时调用任意一个对象的方法；生成动态代理。

## Class
    //获取class
    1) Class c1 = Class.forName ("java.lang.String");      //常用
    2) String str = "abc"; Class c1 = str.getClass();

    //方法, 几乎可以还原一个class的原貌，除了class引用的其它classes(需要记录下所有入参和返回值的类型，加以剔除)
    Method[] methods = c1.getMethods();
    System.out.println(method.getName());
    System.out.println(method.getGenericParameterTypes().length);
    System.out.println(method.getGenericReturnType());

### 运行时生成instance
    1、 无入参的构造函数
        Class c = Class.forName("DynTest");
        obj = c.newInstance();
    2、带入参的构造函数 (先获得指定的constructor)
        Class c = Class.forName("DynTest");
        Class[] pTypes = new Class[] { double.class, int.class };
        Constructor ctor = c.getConstructor(pTypes);    //指定的构造函数
        Object[] arg = new Object[] {3.14159, 125}; //自变量
        Object obj = ctor.newInstance(arg);

### 运行时调用methods
        //先获取方法，组装入参，再实例，调用
        public String func(String s, Hashtable ht)
        {
        …System.out.println("func invoked"); return s;
        }
        public static void main(String args[])
        {
        Class c = Class.forName("Test");
        Class ptypes[] = new Class[2];
        ptypes[0] = Class.forName("java.lang.String");
        ptypes[1] = Class.forName("java.util.Hashtable");
        Method m = c.getMethod("func",ptypes);
        Test obj = new Test();
        Object args[] = new Object[2];
        arg[0] = new String("Hello,world");
        arg[1] = null;
        Object r = m.invoke(obj, arg);
        Integer rval = (String)r;
        System.out.println(rval);
        }

### 运行时变更fields内容
        //先获取field,再示例，再修改
        public class Test {
        public double d;
        public static void main(String args[])
        {
            Class c = Class.forName("Test");
            Field f = c.getField("d"); //指定field 名称
            Test obj = new Test();
            System.out.println("d= " + (Double)f.get(obj));
            f.set(obj, 12.34);
            System.out.println("d= " + obj.d);
        }
        }    

## 访问控制
    00 -- Java的访问控制是停留在编译层的，也就是它不会在.class文件中留下任何的痕迹，只在编译的时候进
        行访问控制的检查。其实，通过反射的手段，是可以访问任何包下任何类中的成员,如私有成员。
    01-private  只对象内部能调用到，如构建方法（实例化）定义为private,则不能通过new 构造方法产生对象。
