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


# Java代理
## JDK动态代理--依赖接口,效率低，素有方法都要调用invoke
    1) 实现InvocationHandler 接口创建自己的调用处理器； --> 为 Proxy 类指定 ClassLoader 对象和一组 interface 来创建动态代理类 
        -->通过反射机制获得动态代理类的构造函数，其唯一参数类型是调用处理器接口类型；
        -->通过构造函数创建动态代理类实例，构造时调用处理器对象作为参数被传入
    3) 参考地址  https://www.zhihu.com/question/20794107/answer/2333038
    package test;
    public interface Subject   
    {   
      public void doSomething();   
    }

    package test;
    public class RealSubject implements Subject   
    {   
      public void doSomething()   
      {   
        System.out.println( "call doSomething()" );   
      }   
    }  

    package test;
    import java.lang.reflect.InvocationHandler;  
    import java.lang.reflect.Method;  
    import java.lang.reflect.Proxy;  

    public class ProxyHandler implements InvocationHandler
    {
        private Object tar;
        //绑定委托对象，并返回代理类
        public Object bind(Object tar)
        {
            this.tar = tar;
            //绑定该类实现的所有接口，取得代理类 
            return Proxy.newProxyInstance(tar.getClass().getClassLoader(),
                                          tar.getClass().getInterfaces(),
                                          this);
        }    
        public Object invoke(Object proxy , Method method , Object[] args)throws Throwable
        {
            Object result = null;
            //这里就可以进行所谓的AOP编程了
            //这里就可以进行所谓的AOP编程了
            //在调用具体函数方法前，执行功能处理
            result = method.invoke(tar,args);
            //在调用具体函数方法后，执行功能处理
            return result;
        }
    }

    public class TestProxy
    {
        public static void main(String args[])
        {
               ProxyHandler proxy = new ProxyHandler();
               //绑定该类实现的所有接口
               Subject sub = (Subject) proxy.bind(new RealSubject());
               sub.doSomething();
        }
    }

## cglib--修改class文件

# Java动态编译
    1) 运行期直接编译.java 文件，执行.class，并且能够获得相关的输入输出
    public class Client {
        public static void main(String[] args) throws Exception {
            //Java 源代码
            Stri ng sourceStr = "public class Hello{public String sayHello (String name)
                {return \"Hello,\" + name + \"!\";}}";
            // 类名及文件名
            String clsName = "Hello";
            // 方法名
            String methodName = "sayHello";
            // 当前编译器
            JavaCompiler cmp = ToolProvider.getSystemJavaCompiler();
            //Java 标准文件管理器
            StandardJavaFileManager fm = cmp.getStandardFileManager(null,null,null);
            //Java 文件对象
            JavaFileObject jfo = new StringJavaObject(clsName,sourceStr);
            // 编译参数，类似于javac <options> 中的options
            List<String> optionsList = new ArrayList<String>();
            // 编译文件的存放地方，注意：此处是为Eclipse 工具特设的
            optionsList.addAll(Arrays.asList("-d","./bin"));
            // 要编译的单元
            List<JavaFileObject> jfos = Arrays.asList(jfo);
            // 设置编译环境
            Java Compiler.CompilationTask task = cmp.getTask(null, fm, null,optionsList,null,jfos);
            // 编译成功
            if(task.call()){
                // 生成对象
                Object obj = Class.forName(clsName).newInstance();
                Class<? extends Object> cls = obj.getClass();
                // 调用sayHello 方法
                Method m = cls.getMethod(methodName, String.class);
                String str = (String) m.invoke(obj, "Dynamic Compilation");
                System.out.println(str);
            }
        }

# Java类加载器 ClassLoder
        虚拟机载入java类：ClassLoader读取.class文件，转换成kava.lang.class的一个实例，
    然后通过newInstance创建该类的一个对象。
        http://www.ibm.com/developerworks/cn/java/j-lo-hotswapcls/
## 层次结构
    //启动顺序 从上往下
    BootStrapClassLoader  核心库,sun.boot.class.path下类加载，或jre/lib下核心API，或Xbootclasspath指定的jar包。
            /\
        ExtClassLoader     加载JRE的扩展目录(JAVA_HOME/jre/lib/ext或java.ext.dirs属性指定的目录)jar的类包。
            /\
        AppClassLoader  最常用，加载classpath下jar包，默认为环境变量CLASSPATH中设定的值。也可通过-classpath指定。
            /\
        CustomClassLoader 自定义类加载过程，进行指定类的运行时动态加载
        java有3个初始类加载器，当虚拟机启动时，他们会按照以下顺序启动: Bootstrap classloader(parent)

    //示例1
    URL[] urls=sun.misc.Launcher.getBootstrapClassPath().getURLs();
        System.out.println(urls[i].toExternalForm());

## java类加载过程
        1、在进行类加载时，首先会从自己向上挨个检查是否已经加载了指定类，如果已经加载则直接返回该类的引用。
    如果到最高层也没有加载过指定类，那么会自顶向下挨个尝试加载，直到用户自定义类加载器，如果还不能成
    功，就会抛出异常（也称委托机制）。
        2、每个类加载器都有自己的名字空间(ClassLoader的classes字段)，对于同一个类加载器实例来说，名字相同的
    类只能存在一个，并且仅加载一次。不管有无变化，下次再需要加载时，它只是从自己的缓存中直接返回已加载过的类引用。
        3、要想实现同一个类的不同版本的共存，我们必须要通过不同的类加载器来加载该类的不同版本。
        4、全盘负责机制：若类A调用了类Ｂ，则类B和类B所引入的所有jar包，都由类A的类加载器统一加载。

## 自定义ClassLoader
### 方案1 重写 findClass,jdk推荐
        Java加载类的过程，实质上是调用loadClass()方法，loadClass中调用findLoadedClass()方
    法来检查该类是否已经被加载过，如果没有就会调用父加载器的loadClass()，如果父加载器
    无法加载该类，就调用findClass()来查找该类。
        所以我们要做的就是新建MyClassLoader继承java.lang.ClassLoader，重写其中的findClass()方法。
    主要是重新设计查找字节码文件的方案，然后调用definedClass来返回。
### 方案2 重写loadClass
        findLoadedClass：每个类加载器都维护有自己的一份已加载类名字空间，其中不能出现两个同名的类。凡是通过该类加载
    器加载的类，无论是直接的还是间接的，都保存在自己的名字空间中，该方法就是在该名字空间中寻找指定的类是否已存在，如
    果存在就返回给类的引用，否则就返回null。这里的直接是指，存在于该类加载器的加载路径上并由该加载器完成加载，间接是
    指，由该类加载器把类的加载工作委托给其他类加载器完成类的实际加载。
        getSystemClassLoader：Java2 中新增的方法。该方法返回系统使用的 ClassLoader。可以在自己定制的类加载器中通过该
    方法把一部分工作转交给系统类加载器去处理。
        defineClass：该方法是 ClassLoader中非常重要的一个方法，它接收以字节数组表示的类字节码，并把它转换成Class实例
    ，该方法转换一个类的同时，会先要求装载该类的父类以及实现的接口类。
    loadClass：加载类的入口方法，调用该方法完成类的显式加载。通过对该方法的重新实现，我们可以完全控制和管理类的加载过程。
    resolveClass：链接一个指定的类。这是一个在某些情况下确保类可用的必要方法，详见 Java 语言规范中“执行”一章对该方法的描述。

##  热加载
    需要升级时取实例化一个新的类加载器.


## 访问控制
    00 -- Java的访问控制是停留在编译层的，也就是它不会在.class文件中留下任何的痕迹，只在编译的时候进
        行访问控制的检查。其实，通过反射的手段，是可以访问任何包下任何类中的成员,如私有成员。
    01-private  只对象内部能调用到，如构建方法（实例化）定义为private,则不能通过new 构造方法产生对象。
